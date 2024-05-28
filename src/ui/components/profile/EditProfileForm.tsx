import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Button} from '../commons/Button';
import {FormInput} from '../commons/FormInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import I18n from '../../../assets/localization/i18n';
import {useEditUserMutation} from '../../../services/user';
import {showErrorToast, showSuccessToast} from '../commons/CustomToast';
import {useNavigation} from '@react-navigation/native';
import {LoadingModal} from '../commons/modal/LoadingModal';
import axios from 'axios';

export const EditProfileForm = ({user, refetch}) => {
  const {email, name, surname, nickname, id} = user;
  const [editUser, {isLoading}] = useEditUserMutation();
  const navigation = useNavigation();

  const profileSchema = Yup.object().shape({
    name: Yup.string().required(I18n.t('profile.requiredField')),
    surname: Yup.string().required(I18n.t('profile.requiredField')),
    nickname: Yup.string().required(I18n.t('profile.requiredField')),
  });

  const handleFormSubmit = async values => {
    const userData = values;
    try {
      await editUser({userId: id, userData});
      showSuccessToast({message: I18n.t('profile.editProfileSuccess')});
      await refetch();
      navigation.navigate('Profile');
    } catch (error) {
      showErrorToast({message: error.message});
    }
  };

  const handleUpdate = async () => {
    ///PARA PROBAR
    const userId = 9;
    const formData = new FormData();
    formData.append('userData', JSON.stringify({nickname: 'mono'}));

    try {
      const response = await axios.patch(
        `https://be-g1-dai-1c-tn-2024.onrender.com/users/${userId}`,
        formData,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZXIubWFyY29zckBnbWFpbC5jb20iLCJpYXQiOjE3MTY5MTMyNjQsImV4cCI6MTcxNjkxNjg2NCwiaXNBY3RpdmUiOnRydWV9.xoyy-6dijjdFnIKUpU1t8vbzjOP3bBgjz1RoIMa6o6HD_OYOfll_GLcwgQVWNEOBHIPBAhvo7_NsLCbEpUTY0w',
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );

      console.log('Usuario actualizado exitosamente', response.data);
    } catch (error) {
      console.error('Error actualizando usuario:', error);
    }
  };

  return (
    <Formik
      initialValues={{email, name, surname, nickname}}
      validationSchema={profileSchema}
      onSubmit={handleUpdate}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        dirty,
      }) => {
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
            keyboardShouldPersistTaps="handled">
            <LoadingModal isVisible={isLoading}> </LoadingModal>
            <FormInput
              label="Nombre"
              editable
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={Boolean(errors.name)}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}
            <FormInput
              editable
              label="Apellido"
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              value={values.surname}
              error={Boolean(errors.surname)}
            />
            {touched.surname && errors.surname && (
              <Text style={styles.errorText}>{errors.surname}</Text>
            )}
            <FormInput editable={false} label="Email" value={values.email} />
            <FormInput
              editable
              label="Nickname"
              onChangeText={handleChange('nickname')}
              onBlur={handleBlur('nickname')}
              value={values.nickname}
              error={Boolean(errors.nickname)}
            />
            {touched.nickname && errors.nickname && (
              <Text style={styles.errorText}>{errors.nickname}</Text>
            )}
            <View
              style={{
                marginTop: 30,
                marginBottom: 150,
                marginHorizontal: 'auto',
              }}>
              <Button
                label={I18n.t('commons.save')}
                disabled={Boolean(Object.keys(errors).length) || !dirty}
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
    marginHorizontal: 20,
    paddingBottom: 100,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: -14,
  },
});
