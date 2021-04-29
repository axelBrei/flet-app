import {Platform} from 'react-native';

export const appendToForm = (form, fieldname, image) => {
  Platform.OS === 'web'
    ? form.append(fieldname, image.original, image.fieldname)
    : form.append(
        fieldname,
        image.original,
        image.filename || new Date().toISOString(),
      );
};
