import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Button} from '../commons/Button';
import {FormInput} from '../commons/FormInput';

export const EditProfileForm = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <FormInput label="Nombre" editable />
      <FormInput label="Apellido" />
      <FormInput label="Email" />
      <FormInput label="Nickname" />
      <View style={{marginTop: 30, marginBottom: 30}}>
        <Button label={'Guardar'} disabled />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
    marginHorizontal: 20,
  },
});
