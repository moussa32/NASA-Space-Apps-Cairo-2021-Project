export const swDev = async () => {
  if ("navigator" in window) {
    const swURL = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swURL).then(res => {
      console.log("Service Worker rigestered!", res);
    });

    let permission = await Notification.requestPermission();
    console.log("[PWALab] Notification permission: " + permission);
  } else {
    alert("Your browser doesn't support ");
  }
};
