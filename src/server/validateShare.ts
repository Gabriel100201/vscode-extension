import bonjour from "bonjour";

export const validateShare = async () => {
  const comChannel = bonjour();
  return new Promise<boolean>((resolve) => {
    let findTimeout: NodeJS.Timeout;
    let isServerOpen: boolean = false;

    // Activar temporizador por 3 segundos
    findTimeout = setTimeout(() => {
      comChannel.destroy();
      resolve(isServerOpen);
    }, 3000);

    comChannel.find({ type: "FAST_SHARE" }, function (service) {
      if (!isServerOpen) {
        isServerOpen = true;
        comChannel.destroy();
        clearTimeout(findTimeout);
        resolve(isServerOpen);
      }
    });
  });
};