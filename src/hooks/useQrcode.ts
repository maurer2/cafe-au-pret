import { ref, watch } from 'vue';
import QRCodeGenerator, { QRCodeToStringOptions } from 'qrcode';

export default function useQrcode(
  content: string,
  style: QRCodeToStringOptions,
) {
  const qrcodeMarkup = ref<string | undefined>(undefined);

  watch(
    () => content,
    async () => {
      try {
        const qrcodeString = await QRCodeGenerator.toString(content, style);

        qrcodeMarkup.value = qrcodeString;
      } catch (error) {
        qrcodeMarkup.value = undefined;
        throw new Error(error);
      }
    },
  );

  return qrcodeMarkup;
}
