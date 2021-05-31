import { ref, watchEffect } from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';

export default function useQRCode(
  content: string,
  style: QRCodeToStringOptions,
) {
  const qrCodeMarkup = ref<string | undefined>(undefined);

  watchEffect(async () => {
    try {
      const qrCodeString = await QRCodeGenerator.toString(content, style);
      qrCodeMarkup.value = qrCodeString;
    } catch (error) {
      qrCodeMarkup.value = undefined;

      throw new Error(error);
    }
  });

  return qrCodeMarkup;
}
