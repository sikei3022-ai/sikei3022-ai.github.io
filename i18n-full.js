/* Skride — полный словарь интерфейса RU → EN / ES / IT.
   Архитектура (как в Smart Fisher): ключ = русская строка.
   Непереведённое автоматически остаётся русским — приложение не ломается.
   Работает поверх существующего I18N, ничего в нём не меняя. */
(function () {
  'use strict';

  // ru: [en, es, it]
  var DICT = {
    "Пропустить": ["Skip", "Omitir", "Salta"],
    "Далее": ["Next", "Siguiente", "Avanti"],
    "Бег, велосипед, пульс и статистика — всё в одном": ["Running, cycling, heart rate and stats — all in one", "Correr, ciclismo, pulso y estadísticas — todo en uno", "Corsa, bici, battito e statistiche — tutto in uno"],
    "GPS-маршрут, темп и дистанция в реальном времени": ["GPS route, pace and distance in real time", "Ruta GPS, ritmo y distancia en tiempo real", "Percorso GPS, ritmo e distanza in tempo reale"],
    "Статистика": ["Statistics", "Estadísticas", "Statistiche"],
    "Нужен доступ": ["Permission needed", "Se necesita permiso", "Serve il permesso"],
    "Позже": ["Later", "Más tarde", "Più tardi"],
    "Разрешить": ["Allow", "Permitir", "Consenti"],
    "Фраза дня": ["Quote of the day", "Frase del día", "Frase del giorno"],
    "Ещё": ["More", "Más", "Altro"],
    "Озвучить": ["Speak", "Leer en voz alta", "Riproduci voce"],
    "Закрыть": ["Close", "Cerrar", "Chiudi"],
    "Радио": ["Radio", "Radio", "Radio"],
    "радио": ["radio", "radio", "radio"],
    "▶ открыть": ["▶ open", "▶ abrir", "▶ apri"],
    "📚 Аудиокниги": ["📚 Audiobooks", "📚 Audiolibros", "📚 Audiolibri"],
    "▶ Играть": ["▶ Play", "▶ Reproducir", "▶ Riproduci"],
    "Установить": ["Install", "Instalar", "Installa"],
    "Бегун": ["Runner", "Corredor", "Corridore"],
    "Укажи город в профиле": ["Set your city in the profile", "Indica tu ciudad en el perfil", "Imposta la città nel profilo"],
    "Изменить": ["Edit", "Editar", "Modifica"],
    "км / неделя": ["km / week", "km / semana", "km / settimana"],
    "недельная цель по дистанции": ["weekly distance goal", "objetivo semanal de distancia", "obiettivo settimanale di distanza"],
    "Цель": ["Goal", "Objetivo", "Obiettivo"],
    "Моя статистика": ["My statistics", "Mis estadísticas", "Le mie statistiche"],
    "Маршрут": ["Route", "Ruta", "Percorso"],
    "автозапись по GPS": ["auto-recording by GPS", "grabación automática por GPS", "registrazione automatica GPS"],
    "Карта:": ["Map:", "Mapa:", "Mappa:"],
    "Карта приложения": ["App map", "Mapa de la app", "Mappa dell'app"],
    "Яндекс карта": ["Yandex map", "Mapa de Yandex", "Mappa Yandex"],
    "Линия маршрута:": ["Route line:", "Línea de ruta:", "Linea del percorso:"],
    "Прямая": ["Straight", "Recta", "Dritta"],
    "Волнистая": ["Wavy", "Ondulada", "Ondulata"],
    "Бег": ["Running", "Correr", "Corsa"],
    "Велосипед": ["Cycling", "Ciclismo", "Bici"],
    "Эллипс": ["Elliptical", "Elíptica", "Ellittica"],
    "Шоссейный": ["Road", "Carretera", "Da strada"],
    "Горный": ["Mountain", "Montaña", "Mountain bike"],
    "Гравийный": ["Gravel", "Gravel", "Gravel"],
    "Городской": ["City", "Urbana", "Da città"],
    "Электро": ["E-bike", "Eléctrica", "Elettrica"],
    "Автозапись по GPS — нажми «Старт» и беги": ["GPS auto-recording — press “Start” and run", "Grabación GPS — pulsa «Iniciar» y corre", "Registrazione GPS — premi «Avvia» e corri"],
    "км": ["km", "km", "km"],
    "время": ["time", "tiempo", "tempo"],
    "темп /км": ["pace /km", "ritmo /km", "ritmo /km"],
    "пульс": ["heart rate", "pulso", "battito"],
    "Старт": ["Start", "Iniciar", "Avvia"],
    "Пауза": ["Pause", "Pausa", "Pausa"],
    "Стоп": ["Stop", "Detener", "Stop"],
    "📷 Отметить место": ["📷 Mark the spot", "📷 Marcar el lugar", "📷 Segna il posto"],
    "⏳ Прокладываю по дорогам…": ["⏳ Routing along roads…", "⏳ Trazando por carreteras…", "⏳ Traccio lungo le strade…"],
    "↩ Точку назад": ["↩ Undo point", "↩ Deshacer punto", "↩ Annulla punto"],
    "Очистить": ["Clear", "Limpiar", "Cancella"],
    "Дистанция, км": ["Distance, km", "Distancia, km", "Distanza, km"],
    "Скорость, км/ч": ["Speed, km/h", "Velocidad, km/h", "Velocità, km/h"],
    "Дата": ["Date", "Fecha", "Data"],
    "Время (Ч : М : С)": ["Time (h : m : s)", "Tiempo (h : m : s)", "Tempo (h : m : s)"],
    "Время (ч : мин : сек)": ["Time (h : min : sec)", "Tiempo (h : min : s)", "Tempo (h : min : sec)"],
    "Название": ["Title", "Título", "Titolo"],
    "Сохранить тренировку": ["Save workout", "Guardar entrenamiento", "Salva allenamento"],
    "Моё место": ["My location", "Mi ubicación", "La mia posizione"],
    "Снимок маршрута": ["Route snapshot", "Captura de la ruta", "Istantanea del percorso"],
    "Устройства": ["Devices", "Dispositivos", "Dispositivi"],
    "дорожка · часы · браслет": ["treadmill · watch · band", "cinta · reloj · pulsera", "tapis roulant · orologio · braccialetto"],
    "Беговая дорожка": ["Treadmill", "Cinta de correr", "Tapis roulant"],
    "не подключена · в зале или дома": ["not connected · gym or home", "no conectada · gimnasio o casa", "non collegato · palestra o casa"],
    "Фото табло с ИИ-распознаванием": ["Console photo with AI recognition", "Foto del panel con reconocimiento IA", "Foto del display con riconoscimento IA"],
    "🔗 Подключить по Bluetooth": ["🔗 Connect via Bluetooth", "🔗 Conectar por Bluetooth", "🔗 Collega via Bluetooth"],
    "Сфоткай дисплей тренажёра — скорость, время и дистанция распознаются и заполнятся сами": ["Photograph the machine display — speed, time and distance are recognised and filled in automatically", "Fotografía la pantalla de la máquina: velocidad, tiempo y distancia se reconocen y se rellenan solos", "Fotografa il display dell'attrezzo: velocità, tempo e distanza vengono riconosciuti e compilati da soli"],
    "Умные часы": ["Smartwatch", "Reloj inteligente", "Smartwatch"],
    "не подключены": ["not connected", "no conectado", "non collegato"],
    "Подключить часы (Bluetooth)": ["Connect watch (Bluetooth)", "Conectar reloj (Bluetooth)", "Collega orologio (Bluetooth)"],
    "Умный браслет": ["Fitness band", "Pulsera inteligente", "Braccialetto fitness"],
    "не подключён": ["not connected", "no conectada", "non collegato"],
    "Подключить браслет (Bluetooth)": ["Connect band (Bluetooth)", "Conectar pulsera (Bluetooth)", "Collega braccialetto (Bluetooth)"],
    "Датчик пульса": ["Heart rate sensor", "Sensor de pulso", "Sensore battito"],
    "Подключить датчик (Bluetooth)": ["Connect sensor (Bluetooth)", "Conectar sensor (Bluetooth)", "Collega sensore (Bluetooth)"],
    "Часы, браслеты и пояса подключаются по стандарту Bluetooth (пульс в реальном времени).": ["Watches, bands and chest straps connect over standard Bluetooth (real-time heart rate).", "Relojes, pulseras y bandas se conectan por Bluetooth estándar (pulso en tiempo real).", "Orologi, braccialetti e fasce si collegano via Bluetooth standard (battito in tempo reale)."],
    "Пульс и зоны": ["Heart rate and zones", "Pulso y zonas", "Battito e zone"],
    "макс. пульс ▾": ["max HR ▾", "FC máx ▾", "FC max ▾"],
    "Эта неделя": ["This week", "Esta semana", "Questa settimana"],
    "цель": ["goal", "objetivo", "obiettivo"],
    "дистанция": ["distance", "distancia", "distanza"],
    "пробежки": ["runs", "carreras", "corse"],
    "Рекорды": ["Records", "Récords", "Record"],
    "дней подряд": ["days in a row", "días seguidos", "giorni di fila"],
    "макс. дистанция": ["longest distance", "distancia máxima", "distanza massima"],
    "лучший темп": ["best pace", "mejor ritmo", "miglior ritmo"],
    "всего пробежек": ["total runs", "carreras totales", "corse totali"],
    "Уровень бегуна": ["Runner level", "Nivel de corredor", "Livello del corridore"],
    "все уровни ▾": ["all levels ▾", "todos los niveles ▾", "tutti i livelli ▾"],
    "🌍 100 легенд бега — где ты среди них": ["🌍 100 running legends — where you stand", "🌍 100 leyendas del running: dónde estás tú", "🌍 100 leggende della corsa — dove sei tu"],
    "ИИ-тренер": ["AI coach", "Entrenador IA", "Coach IA"],
    "анализ твоего бега": ["analysis of your running", "análisis de tu carrera", "analisi della tua corsa"],
    "💬 Спроси тренера": ["💬 Ask the coach", "💬 Pregunta al entrenador", "💬 Chiedi al coach"],
    "🎙️ Поговорить с тренером": ["🎙️ Talk to the coach", "🎙️ Hablar con el entrenador", "🎙️ Parla con il coach"],
    "Музыка": ["Music", "Música", "Musica"],
    "Яндекс Музыка": ["Yandex Music", "Yandex Music", "Yandex Music"],
    "Аудиокниги": ["Audiobooks", "Audiolibros", "Audiolibri"],
    "Книги": ["Books", "Libros", "Libri"],
    "Что слушать во время тренировки": ["What to listen to while training", "Qué escuchar durante el entrenamiento", "Cosa ascoltare durante l'allenamento"],
    "Тренер": ["Coach", "Entrenador", "Coach"],
    "Оба": ["Both", "Ambos", "Entrambi"],
    "📚 Слушать аудиокниги": ["📚 Listen to audiobooks", "📚 Escuchar audiolibros", "📚 Ascolta audiolibri"],
    "Яндекс Книги": ["Yandex Books", "Yandex Books", "Yandex Books"],
    "ЛитРес": ["LitRes", "LitRes", "LitRes"],
    "Радио Skride": ["Skride Radio", "Radio Skride", "Radio Skride"],
    "Выбери станцию ниже": ["Pick a station below", "Elige una emisora abajo", "Scegli una stazione qui sotto"],
    "🎵 Своя музыка из Яндекс Музыки": ["🎵 Your own music from Yandex Music", "🎵 Tu música de Yandex Music", "🎵 La tua musica da Yandex Music"],
    "Играть": ["Play", "Reproducir", "Riproduci"],
    "Активности": ["Activities", "Actividades", "Attività"],
    "Настройки": ["Settings", "Ajustes", "Impostazioni"],
    "Режим записи": ["Recording mode", "Modo de grabación", "Modalità registrazione"],
    "Автозапись по GPS": ["GPS auto-recording", "Grabación automática GPS", "Registrazione automatica GPS"],
    "телефон сам пишет маршрут, темп и время": ["the phone records route, pace and time by itself", "el teléfono graba ruta, ritmo y tiempo solo", "il telefono registra percorso, ritmo e tempo da solo"],
    "черти по лесу и полям — линия идёт напрямую": ["draw across forest and fields — the line goes straight", "traza por bosque y campo: la línea va recta", "traccia per boschi e campi: la linea va dritta"],
    "🚴 Велосипед": ["🚴 Cycling", "🚴 Ciclismo", "🚴 Bici"],
    "Тип велосипеда": ["Bike type", "Tipo de bicicleta", "Tipo di bici"],
    "тренер подстроит советы под него": ["the coach will tailor advice to it", "el entrenador adaptará los consejos", "il coach adatterà i consigli"],
    "Горный (MTB)": ["Mountain (MTB)", "Montaña (MTB)", "Mountain bike (MTB)"],
    "Голос ИИ-тренера": ["AI coach voice", "Voz del entrenador IA", "Voce del coach IA"],
    "Голосовые подсказки": ["Voice prompts", "Indicaciones por voz", "Suggerimenti vocali"],
    "тренер говорит во время бега и по кнопке «Послушать»": ["the coach speaks while you run and on the “Listen” button", "el entrenador habla mientras corres y con el botón «Escuchar»", "il coach parla mentre corri e col tasto «Ascolta»"],
    "Голос": ["Voice", "Voz", "Voce"],
    "выбери голос с телефона (со ⭐ — самые живые) и нажми «Проверить»": ["pick a voice from your phone (⭐ are the most natural) and press “Test”", "elige una voz del teléfono (⭐ las más naturales) y pulsa «Probar»", "scegli una voce dal telefono (⭐ le più naturali) e premi «Prova»"],
    "Авто — лучший на телефоне": ["Auto — best on this phone", "Auto: la mejor del teléfono", "Auto — la migliore sul telefono"],
    "Проверить голос": ["Test voice", "Probar voz", "Prova voce"],
    "Максимальный пульс": ["Maximum heart rate", "Pulso máximo", "Battito massimo"],
    "для пульсовых зон · ориентир 220 минус возраст": ["for heart rate zones · rule of thumb 220 minus age", "para zonas de pulso · referencia 220 menos la edad", "per le zone di battito · riferimento 220 meno l'età"],
    "▶ Показать вступление снова": ["▶ Show intro again", "▶ Ver la introducción otra vez", "▶ Rivedi l'introduzione"],
    "💾 Хранение данных": ["💾 Data storage", "💾 Almacenamiento de datos", "💾 Archiviazione dati"],
    "📱 На телефоне": ["📱 On the phone", "📱 En el teléfono", "📱 Sul telefono"],
    "☁️ В облаке": ["☁️ In the cloud", "☁️ En la nube", "☁️ Nel cloud"],
    "Войди в аккаунт, чтобы синхронизировать тренировки.": ["Sign in to sync your workouts.", "Inicia sesión para sincronizar tus entrenamientos.", "Accedi per sincronizzare gli allenamenti."],
    "Регистрация": ["Sign up", "Registro", "Registrazione"],
    "Войти": ["Sign in", "Entrar", "Accedi"],
    "Войти с Яндекс ID": ["Sign in with Yandex ID", "Entrar con Yandex ID", "Accedi con Yandex ID"],
    "быстрый вход и синхронизация": ["quick sign-in and sync", "acceso rápido y sincronización", "accesso rapido e sincronizzazione"],
    "Войти через Google": ["Sign in with Google", "Entrar con Google", "Accedi con Google"],
    "аккаунт Google": ["Google account", "cuenta de Google", "account Google"],
    "Вы вошли": ["You are signed in", "Has iniciado sesión", "Hai effettuato l'accesso"],
    "Выйти": ["Sign out", "Salir", "Esci"],
    "Синхронизировать": ["Sync", "Sincronizar", "Sincronizza"],
    "Удалить аккаунт и все данные": ["Delete account and all data", "Eliminar la cuenta y todos los datos", "Elimina account e tutti i dati"],
    "Облачный ИИ и голос": ["Cloud AI and voice", "IA y voz en la nube", "IA e voce nel cloud"],
    "Проверить": ["Test", "Probar", "Prova"],
    "Сохранить адрес": ["Save address", "Guardar dirección", "Salva indirizzo"],
    "Голос тренера": ["Coach voice", "Voz del entrenador", "Voce del coach"],
    "Авто": ["Auto", "Auto", "Auto"],
    "Алёна (жен)": ["Alyona (female)", "Alyona (mujer)", "Alyona (donna)"],
    "Джейн (жен)": ["Jane (female)", "Jane (mujer)", "Jane (donna)"],
    "Омаж (жен)": ["Omazh (female)", "Omazh (mujer)", "Omazh (donna)"],
    "Филипп (муж)": ["Filipp (male)", "Filipp (hombre)", "Filipp (uomo)"],
    "Эрмиль (муж)": ["Ermil (male)", "Ermil (hombre)", "Ermil (uomo)"],
    "Захар (муж)": ["Zakhar (male)", "Zakhar (hombre)", "Zakhar (uomo)"],
    "🗺️ Карта": ["🗺️ Map", "🗺️ Mapa", "🗺️ Mappa"],
    "Сохранить ключ": ["Save key", "Guardar clave", "Salva chiave"],
    "Язык / Language": ["Language", "Idioma / Language", "Lingua / Language"],
    "Русский": ["Russian", "Ruso", "Russo"],
    "О разработчике": ["About the developer", "Sobre el desarrollador", "Sullo sviluppatore"],
    "Си Кей Лаб": ["Si Kei Lab", "Si Kei Lab", "Si Kei Lab"],
    "Skride разработан в IT-лаборатории «Си Кей Лаб».": ["Skride is built by the Si Kei Lab IT studio.", "Skride está desarrollado por el laboratorio de TI «Si Kei Lab».", "Skride è sviluppato dal laboratorio IT «Si Kei Lab»."],
    "Политика конфиденциальности": ["Privacy policy", "Política de privacidad", "Informativa sulla privacy"],
    "Условия подписки": ["Subscription terms", "Condiciones de la suscripción", "Condizioni dell'abbonamento"],
    "Поддержка:": ["Support:", "Soporte:", "Assistenza:"],
    "Открой все возможности и беги без ограничений.": ["Unlock everything and run without limits.", "Desbloquea todo y corre sin límites.", "Sblocca tutto e corri senza limiti."],
    "GPS-трекинг и маршруты": ["GPS tracking and routes", "Seguimiento GPS y rutas", "Tracciamento GPS e percorsi"],
    "selfie route и пульсовые зоны": ["selfie route and heart rate zones", "selfie route y zonas de pulso", "selfie route e zone di battito"],
    "ИИ-тренер — полный анализ и голос": ["AI coach — full analysis and voice", "Entrenador IA: análisis completo y voz", "Coach IA — analisi completa e voce"],
    "100 легенд бега — рейтинг": ["100 running legends — ranking", "100 leyendas del running: ranking", "100 leggende della corsa — classifica"],
    "Беговая дорожка и датчики": ["Treadmill and sensors", "Cinta de correr y sensores", "Tapis roulant e sensori"],
    "⭐ Оформить подписку — 100 ₽/мес": ["⭐ Subscribe — 100 ₽/month", "⭐ Suscribirse: 100 ₽/mes", "⭐ Abbonati — 100 ₽/mese"],
    "100 легенд бега": ["100 running legends", "100 leyendas del running", "100 leggende della corsa"],
    "Список сильнейших и самых известных марафонцев планеты с реальными результатами.": ["A list of the strongest and best-known marathon runners on the planet, with real results.", "Lista de los maratonianos más fuertes y conocidos del planeta, con resultados reales.", "Elenco dei maratoneti più forti e famosi del pianeta, con risultati reali."],
    "Все уровни бегуна": ["All runner levels", "Todos los niveles de corredor", "Tutti i livelli del corridore"],
    "Цель на неделю": ["Weekly goal", "Objetivo semanal", "Obiettivo settimanale"],
    "Сколько километров планируешь пробегать за неделю? Кольцо будет показывать прогресс.": ["How many kilometres do you plan to run per week? The ring shows your progress.", "¿Cuántos kilómetros piensas correr por semana? El anillo mostrará el progreso.", "Quanti chilometri pensi di correre a settimana? L'anello mostrerà i progressi."],
    "Отмена": ["Cancel", "Cancelar", "Annulla"],
    "Сохранить": ["Save", "Guardar", "Salva"],
    "Редактировать пробежку": ["Edit run", "Editar carrera", "Modifica corsa"],
    "Заметка": ["Note", "Nota", "Nota"],
    "Удалить": ["Delete", "Eliminar", "Elimina"],
    "Профиль": ["Profile", "Perfil", "Profilo"],
    "Имя": ["Name", "Nombre", "Nome"],
    "сохранит тренировки в облаке": ["will save your workouts in the cloud", "guardará tus entrenamientos en la nube", "salverà gli allenamenti nel cloud"],
    "✓ Вы вошли через Яндекс": ["✓ Signed in with Yandex", "✓ Has entrado con Yandex", "✓ Accesso con Yandex effettuato"],
    "Аватар": ["Avatar", "Avatar", "Avatar"],
    "Загрузить фото": ["Upload photo", "Subir foto", "Carica foto"],
    "Случайная": ["Random", "Aleatorio", "Casuale"],
    "Пол": ["Gender", "Sexo", "Sesso"],
    "👨 Мужчина": ["👨 Male", "👨 Hombre", "👨 Uomo"],
    "👩 Женщина": ["👩 Female", "👩 Mujer", "👩 Donna"],
    "Город": ["City", "Ciudad", "Città"],
    "Пробежка": ["Run", "Carrera", "Corsa"],
    "Москва": ["Moscow", "Moscú", "Mosca"],
    // placeholder / title / aria-label
    "ссылка на книгу из Яндекс Музыки": ["link to a book from Yandex Music", "enlace a un libro de Yandex Music", "link a un libro da Yandex Music"],
    "Поиск места: улица, парк, город...": ["Search a place: street, park, city...", "Buscar lugar: calle, parque, ciudad...", "Cerca un luogo: via, parco, città..."],
    "Тренировки, пульс, травмы, питание, техника...": ["Training, heart rate, injuries, nutrition, technique...", "Entrenamiento, pulso, lesiones, nutrición, técnica...", "Allenamento, battito, infortuni, alimentazione, tecnica..."],
    "Вставь ссылку на свой плейлист…": ["Paste a link to your playlist…", "Pega el enlace de tu lista…", "Incolla il link della tua playlist…"],
    "Пароль (от 6 символов)": ["Password (6+ characters)", "Contraseña (6+ caracteres)", "Password (6+ caratteri)"],
    "Как тебя зовут": ["What's your name", "¿Cómo te llamas?", "Come ti chiami"],
    "Открыть в Яндекс Музыке": ["Open in Yandex Music", "Abrir en Yandex Music", "Apri in Yandex Music"],
    "открыть в Яндекс Музыке": ["open in Yandex Music", "abrir en Yandex Music", "apri in Yandex Music"],
    "открыть снаружи": ["open externally", "abrir fuera", "apri esternamente"],
    "предыдущая станция": ["previous station", "emisora anterior", "stazione precedente"],
    "пауза или играть": ["pause or play", "pausa o reproducir", "pausa o riproduci"],
    "следующая станция": ["next station", "emisora siguiente", "stazione successiva"],
    "свернуть плеер": ["collapse player", "contraer reproductor", "riduci player"],
    "скрыть плеер": ["hide player", "ocultar reproductor", "nascondi player"],
    "закрыть": ["close", "cerrar", "chiudi"],
    "статистика": ["statistics", "estadísticas", "statistiche"],
    "настройки": ["settings", "ajustes", "impostazioni"],
    "озвучить": ["speak", "leer en voz alta", "riproduci voce"],
    "найти": ["search", "buscar", "cerca"],
    "отправить": ["send", "enviar", "invia"],
    "играть или пауза": ["play or pause", "reproducir o pausa", "riproduci o pausa"],
    "стоп": ["stop", "detener", "stop"],
    "Закрыть настройки": ["Close settings", "Cerrar ajustes", "Chiudi impostazioni"]
  };

  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var IDX = { en: 0, es: 1, it: 2 };
  var origText = new WeakMap();   // текстовый узел -> исходный русский
  var origAttrs = new WeakMap();  // элемент -> {attr: исходное значение}
  var applying = false;
  var curLang = 'ru';

  function tr(ru, lang) {
    var v = DICT[ru];
    if (!v) return null;
    if (lang === 'ru') return null;
    var i = IDX[lang];
    if (i === undefined) i = 0;    // язык без своего перевода (напр. ja) → английский, а не русский
    return v[i] || v[0] || null;
  }

  function translateTextNodes(root, lang) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (!origText.has(node)) origText.set(node, node.nodeValue);
      var src = origText.get(node);
      if (lang === 'ru') { if (node.nodeValue !== src) node.nodeValue = src; return; }
      var key = src.trim();
      var t = tr(key, lang);
      if (t != null) {
        var next = src.replace(key, t);
        if (node.nodeValue !== next) node.nodeValue = next;
      }
    });
  }

  function translateAttrs(root, lang) {
    var sel = ATTRS.map(function (a) { return '[' + a + ']'; }).join(',');
    var els = root.querySelectorAll ? root.querySelectorAll(sel) : [];
    Array.prototype.forEach.call(els, function (el) {
      if (!origAttrs.has(el)) {
        var o = {};
        ATTRS.forEach(function (a) { if (el.hasAttribute(a)) o[a] = el.getAttribute(a); });
        origAttrs.set(el, o);
      }
      var o = origAttrs.get(el);
      ATTRS.forEach(function (a) {
        if (!(a in o)) return;
        if (lang === 'ru') { if (el.getAttribute(a) !== o[a]) el.setAttribute(a, o[a]); return; }
        var t = tr(String(o[a]).trim(), lang);
        if (t != null && el.getAttribute(a) !== t) el.setAttribute(a, t);
      });
    });
  }

  function apply(lang) {
    if (applying) return;
    applying = true;
    curLang = lang || 'ru';
    try {
      translateTextNodes(document.body, curLang);
      translateAttrs(document.body, curLang);
    } catch (e) { /* перевод не должен ломать приложение */ }
    applying = false;
  }

  // Перерисовка динамических кусков (списки, модалки) — переводим появившееся
  var pending = null;
  function observe() {
    if (!window.MutationObserver || !document.body) return;
    new MutationObserver(function (muts) {
      if (applying || curLang === 'ru') return;
      var need = false;
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) { need = true; break; }
      }
      if (!need) return;
      clearTimeout(pending);
      pending = setTimeout(function () { apply(curLang); }, 120);
    }).observe(document.body, { childList: true, subtree: true });
  }

  function currentLang() {
    var s = document.getElementById('langSel');
    return (s && s.value) ? s.value : 'ru';
  }

  function boot() {
    apply(currentLang());
    observe();
    var s = document.getElementById('langSel');
    if (s) s.addEventListener('change', function () { setTimeout(function () { apply(currentLang()); }, 60); });
    // приложение может выставить язык позже (из хранилища) — подхватим
    setTimeout(function () { apply(currentLang()); }, 900);
    setTimeout(function () { apply(currentLang()); }, 2500);
  }

  window.skApplyI18n = apply;   // для ручного вызова из приложения

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
