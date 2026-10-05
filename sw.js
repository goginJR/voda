// Корневой сервис-воркер снят: приложения разведены по /voda/d/ и /voda/m/.
// Этот файл только убирает сам себя и старый кэш у тех, кто уже открывал корень.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.indexOf('reis-v') === 0).map(k => caches.delete(k)));
    await self.registration.unregister();
    const cs = await self.clients.matchAll({type: 'window'});
    cs.forEach(c => c.navigate(c.url));
  })());
});
