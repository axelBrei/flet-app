export const REJECTION_FIELDS_MAPPINGS = {
  'legals.driving_permit_front_url': 'Registro frente',
  'legals.driving_permit_back_url': 'Registro dorso',
  'legals.document_front_url': 'DNI frente',
  'legals.document_back_url': 'DNI dorso',
  'legals.insurance_url': 'Seguro de vehiculo',
  'legals.background_url': 'Antecedentes',
  'legals.address_validation_url': 'Validación dirección',
  bank_number: 'Cuenta bancaria',
  'vehicle.driving_permit_front': 'Cedula frente',
  'vehicle.driving_permit_back': 'Cedula dorso',
  'vehicle.insurance_url': 'Seguro del vehiculo',
  'vehicle.number': 'Patente',
  'vehicle.model': 'Modelo de vehiculo',
  'vehicle.type': 'Tipo de vehiculo',
};

export const getRejectionIcon = field => {
  if (
    field.includes('_url') ||
    field.includes('front') ||
    field.includes('back')
  ) {
    return 'camera';
  }
  return 'pencil';
};
