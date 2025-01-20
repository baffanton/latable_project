export const prettifyPhoneNumber = (phoneNumber: string): string =>
  `+${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(
    4,
    7,
  )} ${phoneNumber.substring(7, 9)} ${phoneNumber.substring(9, phoneNumber.length)}`;
