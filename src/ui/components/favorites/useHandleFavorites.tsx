import {useDispatch, useSelector} from 'react-redux';
import {useConfirmModal} from '../commons/ConfirmModal';
import {
  useAddFavoriteMutation,
  useLazyGetFavoritesQuery,
  useRemoveFavoriteMutation,
  usersApi,
} from '../../../services/user';
import {showErrorToast, showSuccessToast} from '../commons/CustomToast';
import I18n from '../../../assets/localization/i18n';
import {moviesApi} from '../../../services/movies';

export const useHandleFavorites = () => {
  const userId = useSelector(state => state?.userSession?.userId);
  const [triggerFavorites] = useLazyGetFavoritesQuery();
  const {handleModalVisibility, isConfirmVisible} = useConfirmModal();
  const [addFavorite, {isLoading: isAddFavoriteLoading}] =
    useAddFavoriteMutation();
  const [removeFavorite, {isLoading: isRemoveFavoriteLoading}] =
    useRemoveFavoriteMutation();
  const dispatch = useDispatch();

  const handleAddFavorite = async ({movieId}: {movieId: number}) => {
    try {
      await addFavorite({userId, movieId}).unwrap();
      dispatch(
        moviesApi.util.updateQueryData('getMovieById', {movieId}, draft => {
          draft.isUserFavorite = true;
        }),
      );
      triggerFavorites({userId, page: 1});
      showSuccessToast({message: I18n.t('favorites.success')});
    } catch (error) {
      console.log(error);
      showErrorToast({message: I18n.t('favorites.error')});
    }
  };
  const handleRemoveFavorite = async ({movieId}: {movieId: number}) => {
    try {
      await removeFavorite({userId, movieId}).unwrap();
      dispatch(
        moviesApi.util.updateQueryData('getMovieById', {movieId}, draft => {
          draft.isUserFavorite = false;
        }),
      );
      dispatch(
        usersApi.util.updateQueryData('getFavorites', {userId}, draft => {
          draft.movies = draft.movies.filter(movie => movie.id !== movieId);
          draft.totalRecords = draft.totalRecords - 1;
        }),
      );
      handleModalVisibility();
      showSuccessToast({message: I18n.t('favorites.removeSuccess')});
    } catch (error) {
      console.log(error);
      showErrorToast({message: I18n.t('favorites.removeError')});
    }
  };

  return {
    handleAddFavorite,
    isAddFavoriteLoading,
    handleRemoveFavorite,
    isRemoveFavoriteLoading,
    handleModalVisibility,
    isConfirmVisible,
  };
};
