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
    "ИИ-тренер по бегу": ["AI running coach", "Entrenador de running con IA", "Coach di corsa con IA"],
    "Голосовые советы, пульсовые зоны и умные подсказки прямо на пробежке.": ["Voice guidance, heart-rate zones and smart tips right as you run.", "Guía por voz, zonas de frecuencia cardíaca y consejos inteligentes mientras corres.", "Guida vocale, zone di frequenza cardiaca e consigli intelligenti mentre corri."],
    "Музыка в приложении": ["Music in the app", "Música en la app", "Musica nell'app"],
    "Включай подборки и радио для бега, не выходя из приложения.": ["Play running playlists and radio without leaving the app.", "Pon listas y radio para correr sin salir de la app.", "Ascolta playlist e radio per la corsa senza uscire dall'app."],
    "Сфоткай табло тренажёра": ["Snap the machine display", "Fotografía la pantalla de la máquina", "Fotografa il display della macchina"],
    "Сними показания беговой дорожки — цифры занесутся автоматически.": ["Photograph the treadmill readout — the numbers are filled in automatically.", "Fotografía los datos de la cinta y los números se registran automáticamente.", "Fotografa i dati del tapis roulant e i numeri vengono inseriti automaticamente."],
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
    "Публичная оферта": ["Public offer (terms)", "Oferta pública (condiciones)", "Offerta pubblica (condizioni)"],
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

  // Японский — отдельным словарём (ключ = русская строка). Чего нет — падает на английский.
  var JA = {
    "Пропустить": "スキップ",
    "Далее": "次へ",
    "ИИ-тренер по бегу": "AIランニングコーチ",
    "Голосовые советы, пульсовые зоны и умные подсказки прямо на пробежке.": "走りながら音声ガイド、心拍ゾーン、スマートなアドバイスを。",
    "Музыка в приложении": "アプリ内で音楽を",
    "Включай подборки и радио для бега, не выходя из приложения.": "アプリを離れずにランニング向けのプレイリストやラジオを再生。",
    "Сфоткай табло тренажёра": "マシンの表示を撮影",
    "Сними показания беговой дорожки — цифры занесутся автоматически.": "ランニングマシンの数値を撮れば自動で入力されます。",
    "Бег, велосипед, пульс и статистика — всё в одном": "ランニング、サイクリング、心拍、統計 — すべて一つに",
    "GPS-маршрут, темп и дистанция в реальном времени": "GPSルート、ペース、距離をリアルタイムで",
    "Статистика": "統計",
    "Нужен доступ": "許可が必要です",
    "Позже": "後で",
    "Разрешить": "許可する",
    "Фраза дня": "今日の一言",
    "Ещё": "その他",
    "Озвучить": "読み上げ",
    "Закрыть": "閉じる",
    "Радио": "ラジオ",
    "радио": "ラジオ",
    "▶ открыть": "▶ 開く",
    "📚 Аудиокниги": "📚 オーディオブック",
    "▶ Играть": "▶ 再生",
    "Установить": "インストール",
    "Бегун": "ランナー",
    "Укажи город в профиле": "プロフィールに都市を設定",
    "Изменить": "編集",
    "км / неделя": "km / 週",
    "недельная цель по дистанции": "週間の距離目標",
    "Цель": "目標",
    "Моя статистика": "マイ統計",
    "Маршрут": "ルート",
    "автозапись по GPS": "GPSで自動記録",
    "Карта:": "地図:",
    "Карта приложения": "アプリの地図",
    "Яндекс карта": "Yandex 地図",
    "Линия маршрута:": "ルートの線:",
    "Прямая": "直線",
    "Волнистая": "波線",
    "Бег": "ランニング",
    "Велосипед": "サイクリング",
    "Эллипс": "エリプティカル",
    "Шоссейный": "ロード",
    "Горный": "マウンテン",
    "Гравийный": "グラベル",
    "Городской": "シティ",
    "Электро": "電動",
    "Автозапись по GPS — нажми «Старт» и беги": "GPS自動記録 —「スタート」を押して走る",
    "км": "km",
    "время": "時間",
    "темп /км": "ペース /km",
    "пульс": "心拍",
    "Старт": "スタート",
    "Пауза": "一時停止",
    "Стоп": "停止",
    "📷 Отметить место": "📷 場所を記録",
    "⏳ Прокладываю по дорогам…": "⏳ 道路に沿って作成中…",
    "↩ Точку назад": "↩ 1点戻す",
    "Очистить": "クリア",
    "Дистанция, км": "距離、km",
    "Скорость, км/ч": "速度、km/h",
    "Дата": "日付",
    "Время (Ч : М : С)": "時間 (時 : 分 : 秒)",
    "Время (ч : мин : сек)": "時間 (時 : 分 : 秒)",
    "Название": "タイトル",
    "Сохранить тренировку": "ワークアウトを保存",
    "Моё место": "現在地",
    "Снимок маршрута": "ルートのスナップ",
    "Устройства": "デバイス",
    "дорожка · часы · браслет": "トレッドミル · 時計 · バンド",
    "Беговая дорожка": "トレッドミル",
    "не подключена · в зале или дома": "未接続 · ジムまたは自宅",
    "Фото табло с ИИ-распознаванием": "AI認識でパネルを撮影",
    "🔗 Подключить по Bluetooth": "🔗 Bluetoothで接続",
    "Сфоткай дисплей тренажёра — скорость, время и дистанция распознаются и заполнятся сами": "マシンの画面を撮影 — 速度・時間・距離を認識して自動入力します",
    "Умные часы": "スマートウォッチ",
    "не подключены": "未接続",
    "Подключить часы (Bluetooth)": "時計を接続 (Bluetooth)",
    "Умный браслет": "スマートバンド",
    "не подключён": "未接続",
    "Подключить браслет (Bluetooth)": "バンドを接続 (Bluetooth)",
    "Датчик пульса": "心拍センサー",
    "Подключить датчик (Bluetooth)": "センサーを接続 (Bluetooth)",
    "Часы, браслеты и пояса подключаются по стандарту Bluetooth (пульс в реальном времени).": "時計・バンド・チェストストラップは標準Bluetoothで接続します（リアルタイム心拍）。",
    "Пульс и зоны": "心拍とゾーン",
    "макс. пульс ▾": "最大心拍 ▾",
    "Эта неделя": "今週",
    "цель": "目標",
    "дистанция": "距離",
    "пробежки": "ラン",
    "Рекорды": "記録",
    "дней подряд": "連続日数",
    "макс. дистанция": "最長距離",
    "лучший темп": "ベストペース",
    "всего пробежек": "総ラン数",
    "Уровень бегуна": "ランナーレベル",
    "все уровни ▾": "全レベル ▾",
    "🌍 100 легенд бега — где ты среди них": "🌍 ランニングの伝説100人 — あなたの位置は",
    "ИИ-тренер": "AIコーチ",
    "анализ твоего бега": "あなたのランを分析",
    "💬 Спроси тренера": "💬 コーチに質問",
    "🎙️ Поговорить с тренером": "🎙️ コーチと話す",
    "Музыка": "音楽",
    "Яндекс Музыка": "Yandex Music",
    "Аудиокниги": "オーディオブック",
    "Книги": "書籍",
    "Что слушать во время тренировки": "トレーニング中に聴くもの",
    "Тренер": "コーチ",
    "Оба": "両方",
    "📚 Слушать аудиокниги": "📚 オーディオブックを聴く",
    "Яндекс Книги": "Yandex Books",
    "ЛитРес": "LitRes",
    "Радио Skride": "Skride ラジオ",
    "Выбери станцию ниже": "下から局を選択",
    "🎵 Своя музыка из Яндекс Музыки": "🎵 Yandex Music のマイ音楽",
    "Играть": "再生",
    "Активности": "アクティビティ",
    "Настройки": "設定",
    "Режим записи": "記録モード",
    "Автозапись по GPS": "GPS自動記録",
    "телефон сам пишет маршрут, темп и время": "スマホがルート・ペース・時間を自動で記録",
    "черти по лесу и полям — линия идёт напрямую": "森や野原をなぞる — 線は直線でつながる",
    "🚴 Велосипед": "🚴 サイクリング",
    "Тип велосипеда": "自転車の種類",
    "тренер подстроит советы под него": "コーチがそれに合わせて助言します",
    "Горный (MTB)": "マウンテン (MTB)",
    "Голос ИИ-тренера": "AIコーチの音声",
    "Голосовые подсказки": "音声ガイド",
    "тренер говорит во время бега и по кнопке «Послушать»": "走行中と「聴く」ボタンでコーチが話します",
    "Голос": "音声",
    "выбери голос с телефона (со ⭐ — самые живые) и нажми «Проверить»": "スマホの音声を選び（⭐が最も自然）「テスト」を押す",
    "Авто — лучший на телефоне": "自動 — この端末で最適",
    "Проверить голос": "音声をテスト",
    "Максимальный пульс": "最大心拍数",
    "для пульсовых зон · ориентир 220 минус возраст": "心拍ゾーン用 · 目安は220マイナス年齢",
    "▶ Показать вступление снова": "▶ イントロを再表示",
    "💾 Хранение данных": "💾 データの保存",
    "📱 На телефоне": "📱 端末に保存",
    "☁️ В облаке": "☁️ クラウドに保存",
    "Войди в аккаунт, чтобы синхронизировать тренировки.": "アカウントにログインしてワークアウトを同期。",
    "Регистрация": "登録",
    "Войти": "ログイン",
    "Войти с Яндекс ID": "Yandex ID でログイン",
    "быстрый вход и синхронизация": "かんたんログインと同期",
    "Войти через Google": "Google でログイン",
    "аккаунт Google": "Google アカウント",
    "Вы вошли": "ログイン済み",
    "Выйти": "ログアウト",
    "Синхронизировать": "同期",
    "Удалить аккаунт и все данные": "アカウントと全データを削除",
    "Облачный ИИ и голос": "クラウドAIと音声",
    "Проверить": "テスト",
    "Сохранить адрес": "アドレスを保存",
    "Голос тренера": "コーチの音声",
    "Авто": "自動",
    "Алёна (жен)": "アリョーナ (女性)",
    "Джейн (жен)": "ジェーン (女性)",
    "Омаж (жен)": "オマージュ (女性)",
    "Филипп (муж)": "フィリップ (男性)",
    "Эрмиль (муж)": "エルミール (男性)",
    "Захар (муж)": "ザハール (男性)",
    "🗺️ Карта": "🗺️ 地図",
    "Сохранить ключ": "キーを保存",
    "Язык / Language": "言語 / Language",
    "Русский": "ロシア語",
    "О разработчике": "開発者について",
    "Си Кей Лаб": "Si Kei Lab",
    "Skride разработан в IT-лаборатории «Си Кей Лаб».": "Skride は IT ラボ「Si Kei Lab」が開発しています。",
    "Политика конфиденциальности": "プライバシーポリシー",
    "Условия подписки": "サブスクリプション規約",
    "Публичная оферта": "公開オファー（規約）",
    "Поддержка:": "サポート:",
    "Открой все возможности и беги без ограничений.": "すべての機能を解放して、制限なく走ろう。",
    "GPS-трекинг и маршруты": "GPSトラッキングとルート",
    "selfie route и пульсовые зоны": "セルフィールートと心拍ゾーン",
    "ИИ-тренер — полный анализ и голос": "AIコーチ — 詳細分析と音声",
    "100 легенд бега — рейтинг": "ランニングの伝説100人 — ランキング",
    "Беговая дорожка и датчики": "トレッドミルとセンサー",
    "⭐ Оформить подписку — 100 ₽/мес": "⭐ 登録する — 100₽/月",
    "100 легенд бега": "ランニングの伝説100人",
    "Список сильнейших и самых известных марафонцев планеты с реальными результатами.": "世界で最も強く有名なマラソンランナーの一覧（実際の記録付き）。",
    "Все уровни бегуна": "ランナーの全レベル",
    "Цель на неделю": "週間の目標",
    "Сколько километров планируешь пробегать за неделю? Кольцо будет показывать прогресс.": "週に何キロ走る予定ですか？リングが進捗を表示します。",
    "Отмена": "キャンセル",
    "Сохранить": "保存",
    "Редактировать пробежку": "ランを編集",
    "Заметка": "メモ",
    "Удалить": "削除",
    "Профиль": "プロフィール",
    "Имя": "名前",
    "сохранит тренировки в облаке": "ワークアウトをクラウドに保存します",
    "✓ Вы вошли через Яндекс": "✓ Yandex でログイン済み",
    "Аватар": "アバター",
    "Загрузить фото": "写真をアップロード",
    "Случайная": "ランダム",
    "Пол": "性別",
    "👨 Мужчина": "👨 男性",
    "👩 Женщина": "👩 女性",
    "Город": "都市",
    "Пробежка": "ラン",
    "Москва": "モスクワ",
    "ссылка на книгу из Яндекс Музыки": "Yandex Music の書籍リンク",
    "Поиск места: улица, парк, город...": "場所を検索: 通り、公園、都市...",
    "Тренировки, пульс, травмы, питание, техника...": "トレーニング、心拍、ケガ、栄養、フォーム...",
    "Вставь ссылку на свой плейлист…": "プレイリストのリンクを貼り付け…",
    "Пароль (от 6 символов)": "パスワード（6文字以上）",
    "Как тебя зовут": "お名前は？",
    "Открыть в Яндекс Музыке": "Yandex Music で開く",
    "открыть в Яндекс Музыке": "Yandex Music で開く",
    "открыть снаружи": "外部で開く",
    "предыдущая станция": "前の局",
    "пауза или играть": "一時停止／再生",
    "следующая станция": "次の局",
    "свернуть плеер": "プレーヤーを縮小",
    "скрыть плеер": "プレーヤーを隠す",
    "закрыть": "閉じる",
    "статистика": "統計",
    "настройки": "設定",
    "озвучить": "読み上げ",
    "найти": "検索",
    "отправить": "送信",
    "играть или пауза": "再生／一時停止",
    "стоп": "停止",
    "Закрыть настройки": "設定を閉じる"
  };


  var EXTRA = {"♪ Яндекс Музыка · играет твой плейлист · нажми «открыть» чтобы развернуть · ♪ Яндекс Музыка · играет твой плейлист · нажми «открыть» чтобы развернуть ·": ["♪ Yandex Music · playing your playlist · tap “Open” to expand · ♪ Yandex Music · playing your playlist · tap “Open” to expand ·", "♪ Yandex Music · suena tu lista · toca «Abrir» para ampliar · ♪ Yandex Music · suena tu lista · toca «Abrir» para ampliar ·", "♪ Yandex Music · la tua playlist è in riproduzione · tocca «Apri» per espandere · ♪ Yandex Music · la tua playlist è in riproduzione · tocca «Apri» per espandere ·", "♪ Yandex Music · プレイリストを再生中 · 「開く」をタップして展開 · ♪ Yandex Music · プレイリストを再生中 · 「開く」をタップして展開 ·"], "«Тот, у кого есть зачем жить, выдержит почти любое как.»": ["“He who has a why to live can bear almost any how.”", "«Quien tiene un porqué para vivir puede soportar casi cualquier cómo.»", "«Chi ha un perché per vivere può sopportare quasi ogni come.»", "「生きる理由がある者は、ほとんどどんな苦難にも耐えられる。」"], "— Фридрих Ницше": ["— Friedrich Nietzsche", "— Friedrich Nietzsche", "— Friedrich Nietzsche", "— フリードリヒ・ニーチェ"], "✏️ Тапай по карте — линия проложится по дорогам, дистанция посчитается сама. Время и дату впиши ниже.": ["✏️ Tap the map to trace a route along roads and calculate the distance automatically. Enter the time and date below.", "✏️ Toca el mapa para trazar la ruta por las carreteras y calcular la distancia automáticamente. Introduce la hora y la fecha abajo.", "✏️ Tocca la mappa per tracciare il percorso lungo le strade e calcolare automaticamente la distanza. Inserisci ora e data qui sotto.", "✏️ 地図をタップすると、道路に沿ってルートが引かれ、距離が自動計算されます。時刻と日付を下に入力してください。"], "🌲 Тапай по карте — точки соединятся прямой линией. Для леса, полян и троп. Ставь точки чаще на поворотах.": ["🌲 Tap the map to connect points with straight lines. For forests, clearings and trails. Add more points at turns.", "🌲 Toca el mapa para unir los puntos con líneas rectas. Ideal para bosques, claros y senderos. Añade más puntos en las curvas.", "🌲 Tocca la mappa per unire i punti con linee rette. Ideale per boschi, radure e sentieri. Aggiungi più punti nelle curve.", "🌲 地図をタップすると、点が直線で結ばれます。森や草地、小道向け。曲がり角では点を多めに追加してください。"], "Сфоткай дисплей тренажёра — скорость, время и дистанция распознаются и заполнятся сами.": ["Take a photo of the machine’s display to detect and fill in speed, time and distance automatically.", "Fotografía la pantalla de la máquina para detectar y rellenar automáticamente la velocidad, el tiempo y la distancia.", "Fotografa il display dell’attrezzo per rilevare e inserire automaticamente velocità, tempo e distanza.", "マシンの画面を撮影すると、速度・時間・距離を読み取って自動入力します。"], "Часы, браслеты и пояса подключаются по стандарту Bluetooth (пульс в реальном времени). Полная синхронизация Garmin / Apple Watch / Mi Band и данные о шагах — в нативной версии. Дорожку без Bluetooth можно сфотографировать и вписать цифры.": ["Watches, bands and chest straps connect via Bluetooth for real-time heart rate. Full Garmin / Apple Watch / Mi Band sync and step data are available in the native app. For a treadmill without Bluetooth, photograph its display and enter the numbers.", "Los relojes, pulseras y bandas pectorales se conectan por Bluetooth para mostrar el pulso en tiempo real. La sincronización completa con Garmin / Apple Watch / Mi Band y los datos de pasos están disponibles en la app nativa. Si la cinta no tiene Bluetooth, fotografía la pantalla e introduce los datos.", "Orologi, braccialetti e fasce toraciche si collegano via Bluetooth per mostrare la frequenza cardiaca in tempo reale. La sincronizzazione completa con Garmin / Apple Watch / Mi Band e i dati sui passi sono disponibili nell’app nativa. Se il tapis roulant non ha Bluetooth, fotografa il display e inserisci i valori.", "時計、リストバンド、胸部ストラップはBluetoothで接続でき、心拍数をリアルタイムで表示します。Garmin / Apple Watch / Mi Bandとの完全同期と歩数データはネイティブアプリで利用できます。Bluetooth非対応のトレッドミルは画面を撮影し、数値を入力してください。"], "Максимальный пульс:": ["Max heart rate:", "Frecuencia cardíaca máxima:", "Frequenza cardiaca massima:", "最大心拍数："], "уд/мин. Диапазоны зон (уд/мин) — тренируйся в нужной.": ["bpm. Zone ranges (bpm) — train in the right zone.", "lpm. Rangos de zonas (lpm): entrena en la zona adecuada.", "bpm. Intervalli delle zone (bpm): allenati nella zona giusta.", "拍/分。ゾーンの範囲（拍/分）—適切なゾーンでトレーニング。"], "Живой пульс на графике появится после подключения датчика (Часть 2).": ["Your live heart rate will appear on the chart after you connect a sensor (Part 2).", "Tu pulso en tiempo real aparecerá en el gráfico tras conectar un sensor (Parte 2).", "La frequenza cardiaca in tempo reale apparirà sul grafico dopo aver collegato un sensore (Parte 2).", "センサーを接続すると、リアルタイムの心拍数がグラフに表示されます（パート2）。"], "Восстановление": ["Recovery", "Recuperación", "Recupero", "リカバリー"], "Лёгкая · жиросжигание": ["Easy · fat burning", "Suave · quema de grasa", "Leggera · brucia grassi", "軽め · 脂肪燃焼"], "Аэробная · выносливость": ["Aerobic · endurance", "Aeróbico · resistencia", "Aerobico · resistenza", "有酸素 · 持久力"], "Анаэробная · темповая": ["Anaerobic · tempo", "Anaeróbico · ritmo", "Anaerobico · ritmo", "無酸素 · テンポ"], "Максимальная": ["Maximum", "Máxima", "Massima", "最大"], "м": ["m", "m", "m", "m"], "Твой уровень": ["Your level", "Tu nivel", "Il tuo livello", "あなたのレベル"], "появится после первой записи времени": ["Appears after your first recorded time", "Aparecerá cuando registres tu primer tiempo", "Apparirà dopo che avrai registrato il primo tempo", "初めてタイムを記録すると表示されます"], "Ниже — сравнение со средним бегуном и с лучшими планеты.": ["Below, see how you compare with an average runner and the world's best.", "Abajo puedes compararte con un corredor promedio y los mejores del mundo.", "Qui sotto puoi confrontarti con un runner medio e i migliori al mondo.", "以下で、平均的なランナーや世界のトップ選手と比較できます。"], "Уровень определяется по твоему лучшему темпу на пробежке.": ["Your level is based on your best running pace.", "Tu nivel se basa en tu mejor ritmo al correr.", "Il tuo livello si basa sul tuo miglior ritmo di corsa.", "レベルはランニング中の最速ペースで決まります。"], "Средний бегун-любитель держит около 6:15 /км, мировая элита — 2:50 /км.": ["An average recreational runner runs at about 6:15 /km; the world elite run at 2:50 /km.", "Un corredor aficionado promedio corre a unos 6:15 /km; la élite mundial, a 2:50 /km.", "Un amatore medio corre a circa 6:15 /km; l'élite mondiale, a 2:50 /km.", "平均的な市民ランナーは約6:15 /km、世界トップ選手は2:50 /kmのペースで走ります。"], "Твой лучший темп": ["Your best pace", "Tu mejor ritmo", "Il tuo miglior ritmo", "あなたの最速ペース"], "Средний бегун-любитель": ["Average recreational runner", "Corredor aficionado promedio", "Corridore amatoriale medio", "平均的な市民ランナー"], "6:15 /км": ["6:15 /km", "6:15 /km", "6:15 /km", "6:15 /km"], "Рекорд мира · мужчины": ["World record · men", "Récord mundial · hombres", "Record mondiale · uomini", "世界記録 · 男子"], "2:50 /км": ["2:50 /km", "2:50 /km", "2:50 /km", "2:50 /km"], "Рекорд мира · женщины": ["World record · women", "Récord mundial · mujeres", "Record mondiale · donne", "世界記録 · 女子"], "3:05 /км": ["3:05 /km", "3:05 /km", "3:05 /km", "3:05 /km"], "Привет! Я твой ИИ-тренер": ["Hi! I'm your AI coach", "¡Hola! Soy tu entrenador de IA", "Ciao! Sono il tuo coach IA", "こんにちは！あなたのAIコーチです"], "включи режим тренера — и я начну давать советы": ["Turn on coach mode — and I'll start giving you tips", "Activa el modo entrenador y empezaré a darte consejos", "Attiva la modalità coach e inizierò a darti consigli", "コーチモードをオンにすると、アドバイスを始めます"], "Я разбираю твои пробежки и подсказываю по тренировкам и технике бега — на основе принципов беговых книг. Советами можно пользоваться молча или слушать их голосом.": ["I analyze your runs and offer training and running-form tips based on principles from running books. You can read the tips or listen to them aloud.", "Analizo tus carreras y te doy consejos sobre entrenamiento y técnica de carrera basados en principios de libros de running. Puedes leerlos o escucharlos en voz alta.", "Analizzo le tue corse e ti do consigli sull'allenamento e sulla tecnica di corsa, basati sui principi dei libri di running. Puoi leggerli o ascoltarli ad alta voce.", "ランニングに関する本の原則をもとに、あなたのランを分析し、トレーニングや走り方をアドバイスします。アドバイスは読んでも、音声で聞いてもOKです。"], "Включить ИИ-тренера": ["Enable AI coach", "Activar entrenador de IA", "Attiva coach IA", "AIコーチをオンにする"], "Привет! Я твой тренер. Спроси про тренировки, пульс, восстановление, питание, бег или велосипед.": ["Hi! I'm your coach. Ask me about training, heart rate, recovery, nutrition, running, or cycling.", "¡Hola! Soy tu entrenador. Pregúntame sobre entrenamiento, frecuencia cardíaca, recuperación, nutrición, running o ciclismo.", "Ciao! Sono il tuo coach. Chiedimi di allenamento, frequenza cardiaca, recupero, alimentazione, corsa o ciclismo.", "こんにちは！あなたのコーチです。トレーニング、心拍数、回復、栄養、ランニング、サイクリングについて聞いてください。"], "Сколько раз в неделю бегать?": ["How many times a week should I run?", "¿Cuántas veces a la semana debería correr?", "Quante volte a settimana dovrei correre?", "週に何回走ればいい？"], "Как мой прогресс?": ["How am I progressing?", "¿Cómo voy?", "Come vanno i miei progressi?", "進捗はどう？"], "Болит колено": ["My knee hurts", "Me duele la rodilla", "Mi fa male il ginocchio", "膝が痛い"], "Какой у меня пульс?": ["What's my heart rate?", "¿Cuál es mi frecuencia cardíaca?", "Qual è la mia frequenza cardiaca?", "今の心拍数は？"], "Что есть перед бегом?": ["What should I eat before a run?", "¿Qué comer antes de correr?", "Cosa mangiare prima di correre?", "走る前に何を食べればいい？"], "Как бегать правильно?": ["How should I run?", "¿Cómo correr correctamente?", "Come correre nel modo giusto?", "正しい走り方は？"], "💛 Твоя подписка Яндекс Плюс — внутри приложения": ["💛 Your Yandex Plus subscription, right in the app", "💛 Tu suscripción a Yandex Plus, dentro de la app", "💛 Il tuo abbonamento Yandex Plus, direttamente nell'app", "💛 Yandex Plusのサブスクをアプリ内で"], "Войди в свой Яндекс": ["Sign in to your Yandex account", "Inicia sesión en tu cuenta de Yandex", "Accedi al tuo account Yandex", "Yandexアカウントにログイン"], "один раз": ["once", "una vez", "una volta", "一度だけ"], "прямо в плеере (кнопка «Войти» внутри любого плеера ниже) — и": ["right in the player (the “Sign in” button in any player below) — and", "directamente en el reproductor (botón «Iniciar sesión» en cualquiera de los reproductores de abajo) y", "direttamente nel lettore (pulsante «Accedi» in uno qualsiasi dei lettori qui sotto) e", "下のいずれかのプレーヤー内（「ログイン」ボタン）から直接ログインすれば"], "и": ["and", "y", "e", "そして"], "играют по твоей подписке Плюс, не выходя из приложения. Вход запоминается.": ["play with your Plus subscription without leaving the app. Your login is saved.", "se reproducen con tu suscripción Plus sin salir de la app. Tu sesión queda guardada.", "vengono riprodotti con il tuo abbonamento Plus senza uscire dall'app. L'accesso viene memorizzato.", "Plusのサブスクで、アプリを離れずに再生できます。ログイン状態は保存されます。"], "Русский микс": ["Russian Mix", "Mix ruso", "Mix russo", "ロシアンミックス"], "В приложении Яндекс Музыка открой любой свой плейлист → «···» (или «Поделиться») → «Скопировать ссылку» и вставь сюда — он заиграет в приложении:": ["In Yandex Music, open one of your playlists → “···” (or “Share”) → “Copy link”, then paste it here to play it in the app:", "En Yandex Music, abre una de tus listas → «···» (o «Compartir») → «Copiar enlace» y pégalo aquí para reproducirla en la app:", "In Yandex Music, apri una tua playlist → «···» (o «Condividi») → «Copia link» e incollalo qui per ascoltarla nell’app:", "Yandex Musicで自分のプレイリストを開き、「···」（または「共有」）→「リンクをコピー」を選んでここに貼り付けると、アプリ内で再生できます："], "▶ Плей и пауза — также внутри самого плеера. 🔊 Громкость — кнопками громкости телефона или наушников. Совет: открой Яндекс Музыку, найди плейлист, «Поделиться» → скопируй ссылку и вставь сюда. Для полного воспроизведения нужна активная Яндекс Музыка (подписка/вход) в этом браузере.": ["▶ Play and pause are also available in the player. 🔊 Use your phone or headphone buttons to adjust volume. Tip: open Yandex Music, find a playlist, tap “Share” → copy the link and paste it here. Full playback requires an active Yandex Music subscription and sign-in in this browser.", "▶ También puedes reproducir y pausar desde el reproductor. 🔊 Ajusta el volumen con los botones del teléfono o los auriculares. Consejo: abre Yandex Music, busca una lista, toca «Compartir» → copia el enlace y pégalo aquí. Para reproducirla completa, necesitas una suscripción activa e iniciar sesión en Yandex Music en este navegador.", "▶ Puoi avviare e mettere in pausa anche dal lettore. 🔊 Regola il volume con i tasti del telefono o delle cuffie. Suggerimento: apri Yandex Music, trova una playlist, tocca «Condividi» → copia il link e incollalo qui. Per la riproduzione completa servono un abbonamento attivo e l’accesso a Yandex Music in questo browser.", "▶ 再生・一時停止はプレーヤー内でも操作できます。🔊 音量はスマートフォンやヘッドホンのボタンで調整してください。ヒント：Yandex Musicでプレイリストを探し、「共有」→リンクをコピーしてここに貼り付けます。全曲を再生するには、このブラウザーでYandex Musicへのログインと有効なサブスクリプションが必要です。"], "Пока пусто.": ["Nothing here yet.", "Todavía no hay nada.", "Non c’è ancora nulla.", "まだ何もありません。"], "Нажми «Старт» на карте — пробежка запишется и сохранится сама.": ["Tap “Start” on the map—your run will be recorded and saved automatically.", "Toca «Iniciar» en el mapa: tu carrera se registrará y guardará automáticamente.", "Tocca «Avvia» sulla mappa: la corsa verrà registrata e salvata automaticamente.", "地図上の「スタート」をタップすると、ランニングが自動的に記録・保存されます。"], "Качество голоса зависит от телефона. Самый живой звук на Android даёт движок «Google Синтез речи»: установи приложение Google и выбери его движком (Настройки Android → Спец. возможности → Озвучивание → Google), затем выбери голос со ⭐ здесь.": ["Voice quality depends on your phone. For the most natural sound on Android, install the Google app and select “Google Text-to-Speech” as the engine (Android Settings → Accessibility → Text-to-speech → Google), then choose a voice marked ⭐ here.", "La calidad de la voz depende del teléfono. Para obtener una voz más natural en Android, instala la app de Google y selecciona «Síntesis de voz de Google» como motor (Ajustes de Android → Accesibilidad → Texto a voz → Google). Después, elige aquí una voz con ⭐.", "La qualità della voce dipende dal telefono. Per una voce più naturale su Android, installa l’app Google e seleziona «Sintesi vocale Google» come motore (Impostazioni Android → Accessibilità → Sintesi vocale → Google), poi scegli qui una voce con ⭐.", "音声の品質はスマートフォンによって異なります。Androidでより自然な音声を使うには、Googleアプリをインストールし、「Google テキスト読み上げ」をエンジンに設定してください（Androidの設定 → ユーザー補助 → テキスト読み上げ → Google）。その後、ここで⭐付きの音声を選んでください。"], "Выбери, где хранить тренировки. На телефоне — приватно и без аккаунта. В облаке — данные не потеряются и появится настоящий рейтинг.": ["Choose where to store your workouts. On your phone: private, with no account needed. In the cloud: keep your data safe and join a real leaderboard.", "Elige dónde guardar tus entrenamientos. En el teléfono: privados y sin cuenta. En la nube: tus datos estarán a salvo y tendrás acceso a una clasificación real.", "Scegli dove salvare gli allenamenti. Sul telefono: privati e senza account. Nel cloud: i dati non andranno persi e potrai accedere a una classifica reale.", "トレーニングの保存先を選んでください。スマートフォンなら非公開で、アカウントは不要です。クラウドならデータを失わず、実際のランキングにも参加できます。"], "Подключи свой сервер — и тренер станет «умным» (отвечает на любые вопросы), а голос — живым. Как поднять сервер за 15 минут — в инструкции к архиву сервера. Пусто = офлайн-режим.": ["Connect your own server for a “smart” coach that answers any question and a more natural voice. The guide included with the server archive shows how to set it up in 15 minutes. Leave blank for offline mode.", "Conecta tu propio servidor para tener un entrenador «inteligente» que responda a cualquier pregunta y una voz más natural. Las instrucciones incluidas en el archivo del servidor explican cómo configurarlo en 15 minutos. Déjalo vacío para usar el modo sin conexión.", "Collega il tuo server per avere un coach «intelligente» che risponde a qualsiasi domanda e una voce più naturale. Le istruzioni incluse nell’archivio del server spiegano come configurarlo in 15 minuti. Lascia vuoto per la modalità offline.", "自分のサーバーを接続すると、コーチがどんな質問にも答える「スマート」なコーチになり、音声も自然になります。15分でサーバーを立ち上げる方法は、サーバーのアーカイブに付属する説明書をご覧ください。空欄にするとオフラインモードになります。"], "Карта работает на бесплатной OpenStreetMap — без ключей и привязки к домену. Ничего настраивать не нужно.": ["The map uses free OpenStreetMap—no API keys or domain restrictions. No setup needed.", "El mapa usa OpenStreetMap gratis, sin claves ni vinculación a un dominio. No hace falta configurar nada.", "La mappa usa OpenStreetMap gratuitamente, senza chiavi né vincoli di dominio. Non serve configurare nulla.", "地図には無料のOpenStreetMapを使用しています。キーやドメインの登録は不要で、設定も必要ありません。"], "GPS-трекер бега с голосовым тренером, пульсовыми зонами и сравнением со 100 легендами. Версия 8.6 — крупные кнопки премиума; убран блок тестирования.": ["GPS run tracker with a voice coach, heart-rate zones and comparisons with 100 legends. Version 8.6: larger premium buttons; testing section removed.", "Registro de carreras por GPS con entrenador de voz, zonas de frecuencia cardíaca y comparaciones con 100 leyendas. Versión 8.6: botones prémium más grandes; se eliminó la sección de pruebas.", "Tracker GPS per la corsa con coach vocale, zone di frequenza cardiaca e confronti con 100 leggende. Versione 8.6: pulsanti premium più grandi; rimossa la sezione di test.", "音声コーチ、心拍ゾーン、100人のレジェンドとの比較機能を備えたGPSランニングトラッカー。バージョン8.6：プレミアムボタンを拡大し、テストセクションを削除しました。"], "Условия использования": ["Terms of Use", "Términos de uso", "Termini di utilizzo", "利用規約"], "Все функции доступны бесплатно": ["All features are free", "Todas las funciones son gratis", "Tutte le funzioni sono gratuite", "すべての機能を無料で利用できます"], "Все функции доступны бесплатно ✓": ["All features are free ✓", "Todas las funciones son gratis ✓", "Tutte le funzioni sono gratuite ✓", "すべての機能を無料で利用できます ✓"], "Оформить подписку — 100 ₽/мес": ["Subscribe — 100 ₽/mo", "Suscribirse — 100 ₽/mes", "Abbonati — 100 ₽/mese", "サブスク登録 — 100 ₽/月"], "В международной версии все функции бесплатны: ИИ-тренер с голосом, тренировки, легенды и датчики.": ["All features are free in the international version: voice AI coach, workouts, legends, and sensors.", "En la versión internacional, todas las funciones son gratis: entrenador de IA por voz, entrenamientos, leyendas y sensores.", "Nella versione internazionale tutte le funzioni sono gratuite: coach IA vocale, allenamenti, leggende e sensori.", "国際版では、音声AIコーチ、トレーニング、レジェンド、センサーなど、すべての機能を無料で使えます。"], "Уровень считается по твоему лучшему темпу на одной пробежке. Верхняя планка — реальные мировые рекорды марафона: мужчины 1:59:30 (~2:50/км, Сабастиан Саве), женщины 2:09:56 (~3:05/км, Рут Чепнгетич).": ["Your level is based on your best pace in a single run. The upper limit is set by actual marathon world records: men 1:59:30 (~2:50/km, Sebastian Sawe), women 2:09:56 (~3:05/km, Ruth Chepngetich).", "Tu nivel se calcula según tu mejor ritmo en una sola carrera. El límite superior son los récords mundiales reales de maratón: hombres 1:59:30 (~2:50/km, Sebastian Sawe), mujeres 2:09:56 (~3:05/km, Ruth Chepngetich).", "Il tuo livello si basa sul tuo ritmo migliore in una singola corsa. Il limite massimo è dato dai record mondiali reali della maratona: uomini 1:59:30 (~2:50/km, Sebastian Sawe), donne 2:09:56 (~3:05/km, Ruth Chepngetich).", "レベルは1回のランニングで記録した最高ペースをもとに算出します。上限はマラソンの実際の世界記録です：男子 1:59:30（約2:50/km、セバスチャン・サウェ）、女子 2:09:56（約3:05/km、ルース・チェプンゲティッチ）。"], "Я": ["Me", "Yo", "Io", "私"]};
  Object.keys(EXTRA).forEach(function(k){DICT[k]=EXTRA[k].slice(0,3);JA[k]=EXTRA[k][3];});

  var QUOTE_EXTRA = {"— Лао-цзы": ["— Lao Tzu", "— Lao-Tsé", "— Lao Tzu", "— 老子"], "Путь в тысячу ли начинается с одного шага.": ["A journey of a thousand li begins with a single step.", "Un viaje de mil li comienza con un solo paso.", "Un viaggio di mille li comincia con un solo passo.", "千里の道も一歩から。"], "— Конфуций": ["— Confucius", "— Confucio", "— Confucio", "— 孔子"], "Не важно, как медленно ты идёшь, пока ты не останавливаешься.": ["It doesn’t matter how slowly you go, as long as you don’t stop.", "No importa lo despacio que vayas, siempre que no te detengas.", "Non importa quanto lentamente vai, purché tu non ti fermi.", "止まりさえしなければ、どんなにゆっくり進んでもかまわない。"], "— Аристотель": ["— Aristotle", "— Aristóteles", "— Aristotele", "— アリストテレス"], "Мы есть то, что делаем постоянно. Совершенство — это привычка.": ["We are what we repeatedly do. Excellence is a habit.", "Somos lo que hacemos repetidamente. La excelencia es un hábito.", "Siamo ciò che facciamo ripetutamente. L’eccellenza è un’abitudine.", "私たちは、繰り返し行うことそのものだ。卓越は習慣である。"], "— Сократ": ["— Socrates", "— Sócrates", "— Socrate", "— ソクラテス"], "Познай самого себя — и ты познаешь мир.": ["Know yourself, and you will know the world.", "Conócete a ti mismo y conocerás el mundo.", "Conosci te stesso e conoscerai il mondo.", "自分を知れば、世界がわかる。"], "— Платон": ["— Plato", "— Platón", "— Platone", "— プラトン"], "Начало — половина дела.": ["Starting is half the battle.", "Empezar es la mitad del trabajo.", "Cominciare è metà dell’opera.", "始めれば半分は終わったも同然。"], "Тот, кто хочет сдвинуть мир, пусть сдвинет сначала себя.": ["To move the world, first move yourself.", "Para mover el mundo, muévete primero a ti mismo.", "Per muovere il mondo, muovi prima te stesso.", "世界を動かしたいなら、まず自分を動かそう。"], "Кто побеждает других — силён, кто побеждает себя — могуществен.": ["Those who conquer others are strong; those who conquer themselves are powerful.", "Quien vence a otros es fuerte; quien se vence a sí mismo es poderoso.", "Chi vince gli altri è forte; chi vince se stesso è potente.", "他人に勝つ者は強い。自分に勝つ者は偉大だ。"], "— Народная мудрость": ["— Folk wisdom", "— Sabiduría popular", "— Saggezza popolare", "— 民間の知恵"], "Где есть желание, найдётся и путь.": ["Where there’s a will, there’s a way.", "Donde hay voluntad, hay un camino.", "Volere è potere.", "意志あるところに道は開ける。"], "— Японская мудрость": ["— Japanese wisdom", "— Sabiduría japonesa", "— Saggezza giapponese", "— 日本の知恵"], "Падай семь раз, поднимайся восемь.": ["Fall seven times, get up eight.", "Cae siete veces, levántate ocho.", "Cadi sette volte, rialzati otto.", "七転び八起き。"], "— Марк Аврелий": ["— Marcus Aurelius", "— Marco Aurelio", "— Marco Aurelio", "— マルクス・アウレリウス"], "Мысли становятся судьбой. Думай о хорошем.": ["Thoughts become destiny. Think positive thoughts.", "Los pensamientos se convierten en destino. Piensa en cosas buenas.", "I pensieri diventano destino. Pensa a cose positive.", "思考は運命になる。良いことを考えよう。"], "— Амелия Эрхарт": ["— Amelia Earhart", "— Amelia Earhart", "— Amelia Earhart", "— アメリア・イアハート"], "Сложнее всего начать действовать, остальное зависит лишь от упорства.": ["The hardest part is getting started; the rest takes persistence.", "Lo más difícil es empezar; el resto depende de la perseverancia.", "La parte più difficile è iniziare; il resto dipende dalla perseveranza.", "いちばん難しいのは行動を始めること。あとは粘り強さ次第。"], "Препятствие на пути становится самим путём.": ["The obstacle in the path becomes the path.", "El obstáculo en el camino se convierte en el camino.", "L’ostacolo sul cammino diventa il cammino stesso.", "道を阻むものが、道そのものになる。"], "Не жди идеального момента. Возьми момент и сделай его идеальным.": ["Don’t wait for the perfect moment. Make this moment perfect.", "No esperes el momento perfecto. Haz que este momento sea perfecto.", "Non aspettare il momento perfetto. Rendi perfetto questo momento.", "完璧な瞬間を待たないで。今この瞬間を完璧にしよう。"], "— Сэмюэл Джонсон": ["— Samuel Johnson", "— Samuel Johnson", "— Samuel Johnson", "— サミュエル・ジョンソン"], "Великие дела совершаются не силой, а упорством.": ["Great things are achieved not by strength, but by perseverance.", "Las grandes cosas se logran no con fuerza, sino con perseverancia.", "Le grandi imprese si compiono non con la forza, ma con la perseveranza.", "偉業を成し遂げるのは力ではなく、粘り強さだ。"], "— Древняя мудрость": ["— Ancient wisdom", "— Sabiduría antigua", "— Saggezza antica", "— 古代の知恵"], "Дорогу осилит идущий.": ["The journey is made by walking.", "El camino se hace al andar.", "Il cammino si fa camminando.", "歩き続ければ、道は開ける。"], "Счастье зависит от нас самих.": ["Happiness depends on us.", "La felicidad depende de nosotros mismos.", "La felicità dipende da noi stessi.", "幸せは自分次第。"], "Терпение и труд всё перетрут.": ["Patience and hard work overcome anything.", "La paciencia y el esfuerzo todo lo pueden.", "La pazienza e l'impegno superano ogni ostacolo.", "忍耐と努力があれば、何でも乗り越えられる。"], "Кто хочет — ищет возможности, кто не хочет — ищет причины.": ["Those who want to find a way; those who don’t find excuses.", "Quien quiere busca oportunidades; quien no, busca excusas.", "Chi vuole cerca opportunità; chi non vuole cerca scuse.", "やる気がある人は方法を探し、ない人は言い訳を探す。"], "— Публилий Сир": ["— Publilius Syrus", "— Publilio Siro", "— Publilio Siro", "— プブリリウス・シュルス"], "Сегодняшний день — ученик вчерашнего.": ["Today is yesterday’s student.", "Hoy es el alumno de ayer.", "Oggi è l'allievo di ieri.", "今日は昨日から学ぶ。"], "— Восточная мудрость": ["— Eastern wisdom", "— Sabiduría oriental", "— Saggezza orientale", "— 東洋の知恵"], "Лучшее время посадить дерево было двадцать лет назад. Второе лучшее — сейчас.": ["The best time to plant a tree was twenty years ago. The second-best time is now.", "El mejor momento para plantar un árbol fue hace veinte años. El segundo mejor es ahora.", "Il momento migliore per piantare un albero era vent'anni fa. Il secondo migliore è adesso.", "木を植えるのに最もよい時期は二十年前。次によいのは今。"], "— Пабло Пикассо": ["— Pablo Picasso", "— Pablo Picasso", "— Pablo Picasso", "— パブロ・ピカソ"], "Действие — основа всякого успеха.": ["Action is the foundation of all success.", "La acción es la base de todo éxito.", "L'azione è alla base di ogni successo.", "行動はすべての成功の土台。"], "— Овидий": ["— Ovid", "— Ovidio", "— Ovidio", "— オウィディウス"], "Капля точит камень не силой, а частым падением.": ["A drop wears away stone not by force, but by falling often.", "La gota horada la piedra no por su fuerza, sino por caer una y otra vez.", "La goccia scava la pietra non con la forza, ma cadendo di continuo.", "水滴が石を削るのは、力ではなく、落ち続けるから。"], "Тот, кто двигает горы, начинает с малых камней.": ["Those who move mountains start with small stones.", "Quien mueve montañas empieza con piedras pequeñas.", "Chi sposta le montagne comincia dalle piccole pietre.", "山を動かす人も、小さな石から始める。"], "Сила не в том, чтобы никогда не падать, а в том, чтобы вставать.": ["Strength isn’t never falling; it’s getting back up.", "La fuerza no está en no caer nunca, sino en volver a levantarse.", "La forza non sta nel non cadere mai, ma nel rialzarsi.", "強さとは、転ばないことではなく、立ち上がること。"], "— Оноре де Бальзак": ["— Honoré de Balzac", "— Honoré de Balzac", "— Honoré de Balzac", "— オノレ・ド・バルザック"], "Чтобы дойти до цели, надо прежде всего идти.": ["To reach your goal, you must first start walking.", "Para llegar a la meta, primero hay que ponerse en marcha.", "Per raggiungere la meta, bisogna prima mettersi in cammino.", "目標にたどり着くには、まず歩き出そう。"], "Жизнь — это движение. Двигайся, и она ответит.": ["Life is movement. Keep moving, and life will respond.", "La vida es movimiento. Muévete y te responderá.", "La vita è movimento. Muoviti e ti risponderà.", "人生は動くこと。動けば、人生も応えてくれる。"], "— Бенджамин Франклин": ["— Benjamin Franklin", "— Benjamin Franklin", "— Benjamin Franklin", "— ベンジャミン・フランクリン"], "Усердие — мать удачи.": ["Diligence is the mother of good luck.", "La diligencia es la madre de la buena suerte.", "La diligenza è la madre della fortuna.", "勤勉は幸運の母。"], "— Генри Форд": ["— Henry Ford", "— Henry Ford", "— Henry Ford", "— ヘンリー・フォード"], "Препятствия — это то, что мы видим, когда отводим взгляд от цели.": ["Obstacles are what we see when we take our eyes off the goal.", "Los obstáculos son lo que vemos cuando apartamos la vista de la meta.", "Gli ostacoli sono ciò che vediamo quando distogliamo lo sguardo dalla meta.", "目標から目をそらしたときに見えるものが、障害だ。"], "— Джим Рон": ["— Jim Rohn", "— Jim Rohn", "— Jim Rohn", "— ジム・ローン"], "Дисциплина — мост между целью и достижением.": ["Discipline is the bridge between goals and achievement.", "La disciplina es el puente entre las metas y los logros.", "La disciplina è il ponte tra gli obiettivi e i risultati.", "規律は目標と達成をつなぐ橋。"], "Маленькие шаги каждый день приводят к большим переменам.": ["Small steps every day lead to big changes.", "Los pequeños pasos de cada día llevan a grandes cambios.", "Piccoli passi ogni giorno portano a grandi cambiamenti.", "毎日の小さな一歩が大きな変化につながる。"], "Сначала ты делаешь привычки, потом привычки делают тебя.": ["First you make your habits, then your habits make you.", "Primero creas tus hábitos; luego tus hábitos te forman.", "Prima crei le tue abitudini, poi le tue abitudini formano te.", "最初は自分が習慣をつくり、やがて習慣が自分をつくる。"], "Кто рано встаёт, тому весь мир помогает.": ["The whole world helps those who rise early.", "A quien madruga, el mundo entero le ayuda.", "A chi si alza presto, il mondo intero dà una mano.", "早起きする人には、世界中が味方する。"], "Не сравнивай себя с другими. Сравнивай себя с собой вчерашним.": ["Don’t compare yourself to others. Compare yourself to who you were yesterday.", "No te compares con los demás. Compárate con quien eras ayer.", "Non confrontarti con gli altri. Confrontati con chi eri ieri.", "他人と比べず、昨日の自分と比べよう。"], "Тело достигает того, во что верит ум.": ["The body achieves what the mind believes.", "El cuerpo logra lo que la mente cree posible.", "Il corpo raggiunge ciò in cui la mente crede.", "心が信じることを、体は成し遂げる。"], "Великое начинается с решения попробовать.": ["Great things begin with the decision to try.", "Las grandes cosas empiezan con la decisión de intentarlo.", "Le grandi cose iniziano con la decisione di provarci.", "偉大なことは、挑戦すると決めることから始まる。"], "Тише едешь — дальше будешь.": ["Slow and steady wins the race.", "Sin prisa, se llega más lejos.", "Chi va piano va sano e va lontano.", "急がば回れ。"], "Если устал — отдохни, но не сдавайся.": ["If you’re tired, rest—but don’t give up.", "Si te cansas, descansa, pero no te rindas.", "Se sei stanco, riposati, ma non arrenderti.", "疲れたら休もう。でも諦めないで。"], "Каждый мастер когда-то был новичком.": ["Every expert was once a beginner.", "Todo experto fue principiante alguna vez.", "Ogni esperto è stato un principiante.", "どんな達人も、かつては初心者だった。"], "Сила воли — это мышца: чем больше тренируешь, тем крепче.": ["Willpower is a muscle: the more you train it, the stronger it gets.", "La fuerza de voluntad es un músculo: cuanto más la entrenas, más fuerte se vuelve.", "La forza di volontà è un muscolo: più la alleni, più diventa forte.", "意志の力は筋肉と同じ。鍛えるほど強くなる。"], "Лучше сделать и сожалеть, чем не сделать и жалеть.": ["Better to do it and regret it than not do it and wonder what if.", "Más vale hacerlo y arrepentirse que no hacerlo y quedarse con las ganas.", "Meglio farlo e pentirsene che non farlo e rimpiangerlo.", "やらずに後悔するより、やって後悔しよう。"], "— Древнеримская мудрость": ["— Ancient Roman wisdom", "— Sabiduría de la antigua Roma", "— Saggezza dell’antica Roma", "— 古代ローマの知恵"], "Победа любит подготовку.": ["Victory favors the prepared.", "La victoria favorece a quienes se preparan.", "La vittoria favorisce chi si prepara.", "勝利は準備した人に味方する。"], "— Ралф Уолдо Эмерсон": ["— Ralph Waldo Emerson", "— Ralph Waldo Emerson", "— Ralph Waldo Emerson", "— ラルフ・ウォルドー・エマーソン"], "Здоровье — первое богатство.": ["Health is the greatest wealth.", "La salud es la mayor riqueza.", "La salute è la prima ricchezza.", "健康は何よりの財産。"], "— Плутарх": ["— Plutarch", "— Plutarco", "— Plutarco", "— プルタルコス"], "Движение — кладовая жизни.": ["Movement is the storehouse of life.", "El movimiento es la reserva de la vida.", "Il movimento è la riserva della vita.", "動くことは生命の宝庫。"], "— Гиппократ": ["— Hippocrates", "— Hipócrates", "— Ippocrate", "— ヒポクラテス"], "Ходьба — лучшее лекарство для человека.": ["Walking is the best medicine for people.", "Caminar es la mejor medicina para las personas.", "Camminare è la migliore medicina per le persone.", "歩くことは人にとって最高の薬。"], "— Ювенал": ["— Juvenal", "— Juvenal", "— Giovenale", "— ユウェナリス"], "В здоровом теле — здоровый дух.": ["A healthy mind in a healthy body.", "Mente sana en cuerpo sano.", "Mente sana in corpo sano.", "健全な精神は健全な肉体に宿る。"], "— Махатма Ганди": ["— Mahatma Gandhi", "— Mahatma Gandhi", "— Mahatma Gandhi", "— マハトマ・ガンディー"], "Будь тем изменением, которое хочешь видеть в мире.": ["Be the change you wish to see in the world.", "Sé el cambio que quieres ver en el mundo.", "Sii il cambiamento che vuoi vedere nel mondo.", "世界に望む変化に、あなた自身がなろう。"], "Жизнь измеряется не числом вдохов, а моментами, что захватывают дух.": ["Life is measured not by the number of breaths we take, but by the moments that take our breath away.", "La vida no se mide por las veces que respiramos, sino por los momentos que nos dejan sin aliento.", "La vita non si misura dal numero di respiri, ma dai momenti che ci tolgono il fiato.", "人生は呼吸の数ではなく、息をのむ瞬間で測られる。"], "— Теодор Рузвельт": ["— Theodore Roosevelt", "— Theodore Roosevelt", "— Theodore Roosevelt", "— セオドア・ルーズベルト"], "Делай что можешь, тем что есть, там где ты есть.": ["Do what you can, with what you have, where you are.", "Haz lo que puedas, con lo que tengas, donde estés.", "Fai ciò che puoi, con ciò che hai, dove sei.", "今いる場所で、手元にあるもので、できることをしよう。"], "— К. С. Льюис": ["— C. S. Lewis", "— C. S. Lewis", "— C. S. Lewis", "— C・S・ルイス"], "Трудности готовят обычных людей к необычной судьбе.": ["Hardships prepare ordinary people for an extraordinary destiny.", "Las dificultades preparan a las personas comunes para un destino extraordinario.", "Le difficoltà preparano le persone comuni a un destino straordinario.", "困難は、普通の人を並外れた運命へと備えさせる。"], "— Джордж Элиот": ["— George Eliot", "— George Eliot", "— George Eliot", "— ジョージ・エリオット"], "Никогда не поздно стать тем, кем ты мог бы быть.": ["It's never too late to become who you might have been.", "Nunca es tarde para convertirte en quien podrías haber sido.", "Non è mai troppo tardi per diventare ciò che avresti potuto essere.", "なれたかもしれない自分になるのに、遅すぎることはない。"], "— Сенека": ["— Seneca", "— Séneca", "— Seneca", "— セネカ"], "Кто владеет собой, тот владеет миром.": ["Whoever masters themselves masters the world.", "Quien se domina a sí mismo domina el mundo.", "Chi padroneggia sé stesso padroneggia il mondo.", "自分を制する者は、世界を制する。"], "Сложности укрепляют ум, как труд укрепляет тело.": ["Difficulties strengthen the mind, as work strengthens the body.", "Las dificultades fortalecen la mente, como el trabajo fortalece el cuerpo.", "Le difficoltà rafforzano la mente, come il lavoro rafforza il corpo.", "困難が心を鍛えるように、労働は体を鍛える。"], "— Цицерон": ["— Cicero", "— Cicerón", "— Cicerone", "— キケロ"], "Пока дышу — надеюсь.": ["While I breathe, I hope.", "Mientras respiro, espero.", "Finché respiro, spero.", "息ある限り、希望はある。"], "— Вергилий": ["— Virgil", "— Virgilio", "— Virgilio", "— ウェルギリウス"], "Удача сопутствует смелым.": ["Fortune favors the bold.", "La fortuna favorece a los audaces.", "La fortuna aiuta gli audaci.", "幸運は勇者に味方する。"], "— Фрэнсис Бэкон": ["— Francis Bacon", "— Francis Bacon", "— Francis Bacon", "— フランシス・ベーコン"], "Знание — сила.": ["Knowledge is power.", "El conocimiento es poder.", "La conoscenza è potere.", "知識は力なり。"], "— Гегель": ["— Hegel", "— Hegel", "— Hegel", "— ヘーゲル"], "Свобода — это познанная необходимость.": ["Freedom is the recognition of necessity.", "La libertad es el reconocimiento de la necesidad.", "La libertà è il riconoscimento della necessità.", "自由とは、必然性を認識することだ。"], "Ничто великое в мире не совершалось без страсти.": ["Nothing great in the world has ever been accomplished without passion.", "Nada grande en el mundo se ha logrado sin pasión.", "Nulla di grande al mondo è mai stato compiuto senza passione.", "情熱なくして、この世で偉大なことが成し遂げられたことはない。"], "— Иммануил Кант": ["— Immanuel Kant", "— Immanuel Kant", "— Immanuel Kant", "— イマヌエル・カント"], "Имей мужество пользоваться собственным умом.": ["Have the courage to use your own understanding.", "Ten el valor de usar tu propio entendimiento.", "Abbi il coraggio di usare il tuo intelletto.", "自分の知性を使う勇気を持て。"], "Что не убивает меня, делает меня сильнее.": ["What doesn't kill me makes me stronger.", "Lo que no me mata me hace más fuerte.", "Ciò che non mi uccide mi rende più forte.", "私を殺さないものは、私を強くする。"], "Тот, у кого есть зачем жить, выдержит почти любое как.": ["He who has a why to live can bear almost any how.", "Quien tiene un porqué para vivir puede soportar casi cualquier cómo.", "Chi ha un perché per vivere può sopportare quasi ogni come.", "生きる「なぜ」を持つ者は、ほぼどんな「どうやって」にも耐えられる。"], "— Гораций": ["— Horace", "— Horacio", "— Orazio", "— ホラティウス"], "Дерзай быть мудрым — и начинай.": ["Dare to be wise—and begin.", "Atrévete a ser sabio y empieza.", "Osa essere saggio e comincia.", "賢くある勇気を持て。そして始めよ。"], "— Теофраст": ["— Theophrastus", "— Teofrasto", "— Teofrasto", "— テオプラストス"], "Время — самое ценное, что у нас есть.": ["Time is the most precious thing we have.", "El tiempo es lo más valioso que tenemos.", "Il tempo è la cosa più preziosa che abbiamo.", "時間は、私たちが持つ最も大切なもの。"], "— Мартин Лютер Кинг": ["— Martin Luther King", "— Martin Luther King", "— Martin Luther King", "— マーティン・ルーサー・キング"], "Сделай первый шаг с верой. Необязательно видеть всю лестницу.": ["Take the first step in faith. You don’t have to see the whole staircase.", "Da el primer paso con fe. No hace falta ver toda la escalera.", "Fai il primo passo con fede. Non devi vedere tutta la scala.", "信じて最初の一歩を踏み出そう。階段の先まで見えなくてもいい。"], "Самая длинная дорога начинается под ногами.": ["Even the longest road begins beneath your feet.", "Hasta el camino más largo empieza bajo tus pies.", "Anche la strada più lunga comincia sotto i tuoi piedi.", "どんなに長い道も、足元から始まる。"], "Тот, кто хочет, делает больше, чем тот, кто может.": ["Those who want to do more than those who can.", "Quien quiere hace más que quien puede.", "Chi vuole fa più di chi può.", "やる気のある人は、できるだけの人より多くを成し遂げる。"], "Маленькая ежедневная победа — путь к большой мечте.": ["Small daily wins lead to big dreams.", "Las pequeñas victorias diarias te acercan a un gran sueño.", "Le piccole vittorie quotidiane portano ai grandi sogni.", "毎日の小さな勝利が、大きな夢への道になる。"], "Энергия и упорство покоряют всё.": ["Energy and persistence conquer all.", "La energía y la perseverancia lo conquistan todo.", "Energia e perseveranza conquistano tutto.", "活力と粘り強さがあれば、何でも乗り越えられる。"], "— Китайская мудрость": ["— Chinese wisdom", "— Sabiduría china", "— Saggezza cinese", "— 中国の知恵"], "Не бойся медленного роста, бойся стоять на месте.": ["Don’t fear slow progress; fear standing still.", "No temas avanzar despacio; teme quedarte inmóvil.", "Non temere di avanzare lentamente; temi di restare fermo.", "進みが遅いことを恐れず、立ち止まることを恐れよう。"], "Привычка — вторая натура.": ["Habit is second nature.", "El hábito es una segunda naturaleza.", "L’abitudine è una seconda natura.", "習慣は第二の天性。"], "Жизнь любит тех, кто не сдаётся.": ["Life rewards those who don’t give up.", "La vida favorece a quienes no se rinden.", "La vita premia chi non si arrende.", "人生は、諦めない人に味方する。"], "Будь как вода: мягкая, но точит камень.": ["Be like water: gentle, yet able to wear down stone.", "Sé como el agua: suave, pero capaz de desgastar la piedra.", "Sii come l’acqua: delicata, ma capace di consumare la pietra.", "水のようにあろう。柔らかくても、石を削る力がある。"], "Завтрашний успех рождается из сегодняшнего усилия.": ["Tomorrow’s success begins with today’s effort.", "El éxito de mañana nace del esfuerzo de hoy.", "Il successo di domani nasce dall’impegno di oggi.", "明日の成功は、今日の努力から生まれる。"], "Чем тяжелее путь, тем красивее вершина.": ["The harder the climb, the more beautiful the view from the top.", "Cuanto más duro sea el camino, más hermosa será la cima.", "Più duro è il cammino, più bella è la vetta.", "道が険しいほど、頂上は美しい。"], "Радость в движении, счастье в пути.": ["Find joy in movement and happiness in the journey.", "La alegría está en moverse; la felicidad, en el camino.", "La gioia è nel movimento, la felicità nel cammino.", "動くことに喜びを、歩む道に幸せを。"], "Каждый шаг приближает к цели, даже маленький.": ["Every step brings you closer to your goal, even a small one.", "Cada paso te acerca a tu meta, por pequeño que sea.", "Ogni passo ti avvicina alla meta, anche il più piccolo.", "どんなに小さな一歩も、目標に近づけてくれる。"], "Сила рождается в усилии.": ["Strength is born from effort.", "La fuerza nace del esfuerzo.", "La forza nasce dall’impegno.", "強さは努力から生まれる。"], "Великие реки начинаются с малых ручьёв.": ["Great rivers begin as small streams.", "Los grandes ríos empiezan como pequeños arroyos.", "I grandi fiumi nascono da piccoli ruscelli.", "大河も小さな流れから始まる。"], "Лучшая инвестиция — в собственное здоровье.": ["The best investment is in your health.", "La mejor inversión es en tu salud.", "Il miglior investimento è nella tua salute.", "最高の投資は、自分の健康への投資。"], "Кто бежит за двумя зайцами, не поймает ни одного — выбери цель.": ["Chase two rabbits and you’ll catch neither — choose one goal.", "Quien persigue dos liebres no atrapa ninguna: elige una meta.", "Chi insegue due lepri non ne prende nessuna: scegli un obiettivo.", "二兎を追う者は一兎をも得ず。目標を一つ選ぼう。"], "Победи лень сегодня — и завтра скажешь спасибо.": ["Beat laziness today — you’ll thank yourself tomorrow.", "Vence la pereza hoy y mañana te lo agradecerás.", "Vinci la pigrizia oggi e domani te ne sarai grato.", "今日、怠け心に勝とう。明日の自分が感謝する。"], "Тот, кто встал на путь, уже наполовину у цели.": ["Once you’ve started, you’re halfway to your goal.", "Quien emprende el camino ya está a mitad de la meta.", "Chi si mette in cammino è già a metà strada verso la meta.", "一歩を踏み出せば、もう目標の半分まで来ている。"], "Делай сегодня то, за что завтра скажешь себе спасибо.": ["Do something today that you’ll thank yourself for tomorrow.", "Haz hoy algo que mañana te agradecerás.", "Fai oggi qualcosa per cui domani ringrazierai te stesso.", "明日の自分が感謝することを、今日やろう。"], "Ум растёт от знаний, тело — от движения.": ["The mind grows through knowledge, the body through movement.", "La mente crece con el conocimiento; el cuerpo, con el movimiento.", "La mente cresce con la conoscenza, il corpo con il movimento.", "知識は心を、運動は体を育てる。"], "Не жди вдохновения — начни, и оно придёт.": ["Don’t wait for inspiration—start, and it will come.", "No esperes a la inspiración: empieza y llegará.", "Non aspettare l’ispirazione: inizia e arriverà.", "やる気を待たずに始めよう。やる気は後からついてくる。"], "Мечта без действия остаётся мечтой.": ["A dream without action remains a dream.", "Un sueño sin acción sigue siendo un sueño.", "Un sogno senza azione resta un sogno.", "行動しなければ、夢は夢のまま。"], "Маленькая дисциплина рождает большую свободу.": ["A little discipline brings great freedom.", "Un poco de disciplina trae mucha libertad.", "Un po’ di disciplina porta grande libertà.", "小さな自律が大きな自由を生む。"], "Каждое утро — новый шанс стать лучше.": ["Every morning is a new chance to improve.", "Cada mañana es una nueva oportunidad para mejorar.", "Ogni mattina è una nuova occasione per migliorare.", "毎朝が、自分を磨く新しいチャンス。"], "Терпеливый достигает большего, чем сильный.": ["The patient achieve more than the strong.", "Quien tiene paciencia llega más lejos que quien tiene fuerza.", "Chi ha pazienza ottiene più di chi ha forza.", "力のある人より、忍耐強い人のほうが遠くへ行ける。"], "Сердце, полное цели, не знает усталости.": ["A heart filled with purpose knows no fatigue.", "Un corazón lleno de propósito no conoce el cansancio.", "Un cuore pieno di determinazione non conosce stanchezza.", "目標に満ちた心は、疲れを知らない。"], "Дорога становится легче, когда идёшь по ней каждый день.": ["The path gets easier when you walk it every day.", "El camino se hace más fácil cuando lo recorres cada día.", "Il cammino diventa più facile se lo percorri ogni giorno.", "毎日歩けば、道は少しずつ楽になる。"], "Кто верит в себя, тот уже на полпути к успеху.": ["Believe in yourself, and you’re halfway to success.", "Si crees en ti, ya estás a medio camino del éxito.", "Se credi in te, sei già a metà strada verso il successo.", "自分を信じれば、成功への道はもう半分。"], "Не количество, а постоянство решает.": ["Consistency matters more than quantity.", "Lo que cuenta no es la cantidad, sino la constancia.", "Conta la costanza, non la quantità.", "大切なのは量より継続。"], "Сделанное сегодня — фундамент завтрашнего.": ["What you do today lays the foundation for tomorrow.", "Lo que haces hoy sienta las bases del mañana.", "Ciò che fai oggi getta le basi per domani.", "今日の積み重ねが、明日の土台になる。"], "Сила в спокойствии, спокойствие в движении.": ["Strength lies in calm, and calm in movement.", "La fuerza está en la calma; la calma, en el movimiento.", "La forza sta nella calma, la calma nel movimento.", "強さは落ち着きの中に、落ち着きは動きの中に。"], "Лучший день начать — сегодня.": ["The best day to start is today.", "El mejor día para empezar es hoy.", "Il giorno migliore per iniziare è oggi.", "始めるなら、今日がいちばん。"], "Шаг за шагом — и гора покорится.": ["Step by step, you’ll conquer the mountain.", "Paso a paso, conquistarás la montaña.", "Passo dopo passo, conquisterai la montagna.", "一歩ずつ進めば、山も越えられる。"], "Тот, кто продолжает, побеждает.": ["Those who keep going win.", "Quien sigue adelante, gana.", "Chi non si ferma, vince.", "続ける人が勝つ。"], "Доверься пути — он ведёт сильных.": ["Trust the path—it guides the strong.", "Confía en el camino: guía a los fuertes.", "Fidati del cammino: guida i forti.", "道を信じよう。強い人を導いてくれる。"], "Хорошее начало — половина успеха.": ["A good start is half the battle.", "Un buen comienzo es la mitad del éxito.", "Chi ben comincia è a metà dell’opera.", "良いスタートは成功の半分。"], "Учись так, словно будешь жить вечно; живи так, словно умрёшь завтра.": ["Learn as if you’ll live forever; live as if you’ll die tomorrow.", "Aprende como si fueras a vivir para siempre; vive como si fueras a morir mañana.", "Impara come se dovessi vivere per sempre; vivi come se dovessi morire domani.", "永遠に生きるかのように学び、明日死ぬかのように生きよう。"], "Кто ясно мыслит — ясно действует.": ["Clear thinking leads to clear action.", "Quien piensa con claridad actúa con claridad.", "Chi pensa con chiarezza agisce con chiarezza.", "明晰に考える人は、迷わず行動する。"], "Спокойный ум — сильное тело.": ["A calm mind, a strong body.", "Mente serena, cuerpo fuerte.", "Mente calma, corpo forte.", "穏やかな心、強い体。"], "— Гераклит": ["— Heraclitus", "— Heráclito", "— Eraclito", "— ヘラクレイトス"], "Стань рекой: течёшь — значит живёшь.": ["Be like a river: to flow is to live.", "Sé como un río: fluir es vivir.", "Sii come un fiume: scorrere è vivere.", "川のようになろう。流れることは、生きること。"], "Всё течёт, всё меняется — меняйся к лучшему.": ["Everything flows, everything changes—change for the better.", "Todo fluye, todo cambia: cambia para mejor.", "Tutto scorre, tutto cambia: cambia in meglio.", "すべては流れ、変わっていく。あなたもより良く変わろう。"], "Цени каждый день как подарок.": ["Treasure each day as a gift.", "Valora cada día como un regalo.", "Apprezza ogni giorno come un dono.", "毎日を贈り物として大切にしよう。"], "Богат не тот, у кого много, а тот, кому достаточно.": ["Rich is not the one who has much, but the one who has enough.", "Rico no es quien tiene mucho, sino quien tiene suficiente.", "Ricco non è chi ha molto, ma chi ha abbastanza.", "豊かなのは、多くを持つ人ではなく、足るを知る人。"], "— Игнатий Лойола": ["— Ignatius of Loyola", "— Ignacio de Loyola", "— Ignazio di Loyola", "— イグナチオ・デ・ロヨラ"], "Действуй так, будто от тебя зависит всё.": ["Act as if everything depends on you.", "Actúa como si todo dependiera de ti.", "Agisci come se tutto dipendesse da te.", "すべてが自分にかかっているつもりで行動しよう。"], "Малое усилие сегодня — большое преимущество завтра.": ["A little effort today, a big advantage tomorrow.", "Un pequeño esfuerzo hoy, una gran ventaja mañana.", "Un piccolo sforzo oggi, un grande vantaggio domani.", "今日の小さな努力が、明日の大きな強みになる。"], "— Николай Некрасов": ["— Nikolay Nekrasov", "— Nikolái Nekrásov", "— Nikolaj Nekrasov", "— ニコライ・ネクラーソフ"], "Воля и труд человека дивные дивы творят.": ["Willpower and hard work can work wonders.", "La voluntad y el esfuerzo pueden hacer maravillas.", "La volontà e l'impegno possono fare meraviglie.", "意志と努力は、驚くべきことを成し遂げる。"], "Чтобы изменить жизнь, измени один день.": ["To change your life, change one day.", "Para cambiar tu vida, cambia un día.", "Per cambiare la tua vita, cambia una giornata.", "人生を変えるなら、まず今日を変えよう。"], "Двигайся вперёд, даже если медленно — это всё равно вперёд.": ["Keep moving, even slowly — you're still moving forward.", "Sigue avanzando, aunque sea despacio: sigues avanzando.", "Continua ad avanzare, anche lentamente: stai comunque andando avanti.", "ゆっくりでも進み続けよう。それも前進だ。"], "Сила привычки сильнее силы желания.": ["The power of habit is stronger than the power of desire.", "La fuerza del hábito supera a la del deseo.", "La forza dell'abitudine supera quella del desiderio.", "習慣の力は、願望の力より強い。"], "Сделай шаг — и дорога появится.": ["Take a step, and the path will appear.", "Da un paso y el camino aparecerá.", "Fai un passo e la strada apparirà.", "一歩踏み出せば、道は開ける。"], "Утро добрых дел длиннее дня лени.": ["A morning of good deeds goes further than a day of idleness.", "Una mañana de buenas acciones rinde más que un día de pereza.", "Una mattina di buone azioni vale più di un giorno di pigrizia.", "よいことをする朝は、怠けて過ごす一日より実りが多い。"], "Ты сильнее, чем думаешь.": ["You're stronger than you think.", "Eres más fuerte de lo que crees.", "Sei più forte di quanto pensi.", "あなたは思っているより強い。"], "Каждый финиш — это новый старт.": ["Every finish is a new start.", "Cada meta es un nuevo comienzo.", "Ogni traguardo è un nuovo inizio.", "ゴールはいつだって新たなスタート。"], "Сначала трудно, потом привычно, потом красиво.": ["First it's hard, then it becomes a habit, then it feels great.", "Primero cuesta, luego se vuelve un hábito y después se disfruta.", "All'inizio è dura, poi diventa un'abitudine, infine una gioia.", "最初は大変。やがて習慣になり、最後には楽しくなる。"], "Дисциплина сегодня — гордость завтра.": ["Discipline today, pride tomorrow.", "Disciplina hoy, orgullo mañana.", "Disciplina oggi, orgoglio domani.", "今日の自律が、明日の誇りになる。"], "Тот, кто заботится о теле, заботится о будущем.": ["Taking care of your body means taking care of your future.", "Cuidar tu cuerpo es cuidar tu futuro.", "Prendersi cura del proprio corpo significa prendersi cura del proprio futuro.", "体を大切にすることは、未来を大切にすること。"], "Лучше зажечь свечу, чем проклинать тьму.": ["Better to light a candle than curse the darkness.", "Mejor encender una vela que maldecir la oscuridad.", "Meglio accendere una candela che maledire il buio.", "暗闇を嘆くより、ろうそくに火を灯そう。"], "Радуйся пути не меньше, чем цели.": ["Enjoy the journey as much as the goal.", "Disfruta del camino tanto como de la meta.", "Goditi il percorso tanto quanto la meta.", "目標と同じくらい、そこに至る道のりも楽しもう。"], "«Путь в тысячу ли начинается с одного шага.»": ["«A journey of a thousand li begins with a single step.»", "«Un viaje de mil li comienza con un solo paso.»", "«Un viaggio di mille li comincia con un solo passo.»", "«千里の道も一歩から。»"], "«Не важно, как медленно ты идёшь, пока ты не останавливаешься.»": ["«It doesn’t matter how slowly you go, as long as you don’t stop.»", "«No importa lo despacio que vayas, siempre que no te detengas.»", "«Non importa quanto lentamente vai, purché tu non ti fermi.»", "«止まりさえしなければ、どんなにゆっくり進んでもかまわない。»"], "«Мы есть то, что делаем постоянно. Совершенство — это привычка.»": ["«We are what we repeatedly do. Excellence is a habit.»", "«Somos lo que hacemos repetidamente. La excelencia es un hábito.»", "«Siamo ciò che facciamo ripetutamente. L’eccellenza è un’abitudine.»", "«私たちは、繰り返し行うことそのものだ。卓越は習慣である。»"], "«Познай самого себя — и ты познаешь мир.»": ["«Know yourself, and you will know the world.»", "«Conócete a ti mismo y conocerás el mundo.»", "«Conosci te stesso e conoscerai il mondo.»", "«自分を知れば、世界がわかる。»"], "«Начало — половина дела.»": ["«Starting is half the battle.»", "«Empezar es la mitad del trabajo.»", "«Cominciare è metà dell’opera.»", "«始めれば半分は終わったも同然。»"], "«Тот, кто хочет сдвинуть мир, пусть сдвинет сначала себя.»": ["«To move the world, first move yourself.»", "«Para mover el mundo, muévete primero a ti mismo.»", "«Per muovere il mondo, muovi prima te stesso.»", "«世界を動かしたいなら、まず自分を動かそう。»"], "«Кто побеждает других — силён, кто побеждает себя — могуществен.»": ["«Those who conquer others are strong; those who conquer themselves are powerful.»", "«Quien vence a otros es fuerte; quien se vence a sí mismo es poderoso.»", "«Chi vince gli altri è forte; chi vince se stesso è potente.»", "«他人に勝つ者は強い。自分に勝つ者は偉大だ。»"], "«Где есть желание, найдётся и путь.»": ["«Where there’s a will, there’s a way.»", "«Donde hay voluntad, hay un camino.»", "«Volere è potere.»", "«意志あるところに道は開ける。»"], "«Падай семь раз, поднимайся восемь.»": ["«Fall seven times, get up eight.»", "«Cae siete veces, levántate ocho.»", "«Cadi sette volte, rialzati otto.»", "«七転び八起き。»"], "«Мысли становятся судьбой. Думай о хорошем.»": ["«Thoughts become destiny. Think positive thoughts.»", "«Los pensamientos se convierten en destino. Piensa en cosas buenas.»", "«I pensieri diventano destino. Pensa a cose positive.»", "«思考は運命になる。良いことを考えよう。»"], "«Сложнее всего начать действовать, остальное зависит лишь от упорства.»": ["«The hardest part is getting started; the rest takes persistence.»", "«Lo más difícil es empezar; el resto depende de la perseverancia.»", "«La parte più difficile è iniziare; il resto dipende dalla perseveranza.»", "«いちばん難しいのは行動を始めること。あとは粘り強さ次第。»"], "«Препятствие на пути становится самим путём.»": ["«The obstacle in the path becomes the path.»", "«El obstáculo en el camino se convierte en el camino.»", "«L’ostacolo sul cammino diventa il cammino stesso.»", "«道を阻むものが、道そのものになる。»"], "«Не жди идеального момента. Возьми момент и сделай его идеальным.»": ["«Don’t wait for the perfect moment. Make this moment perfect.»", "«No esperes el momento perfecto. Haz que este momento sea perfecto.»", "«Non aspettare il momento perfetto. Rendi perfetto questo momento.»", "«完璧な瞬間を待たないで。今この瞬間を完璧にしよう。»"], "«Великие дела совершаются не силой, а упорством.»": ["«Great things are achieved not by strength, but by perseverance.»", "«Las grandes cosas se logran no con fuerza, sino con perseverancia.»", "«Le grandi imprese si compiono non con la forza, ma con la perseveranza.»", "«偉業を成し遂げるのは力ではなく、粘り強さだ。»"], "«Дорогу осилит идущий.»": ["«The journey is made by walking.»", "«El camino se hace al andar.»", "«Il cammino si fa camminando.»", "«歩き続ければ、道は開ける。»"], "«Счастье зависит от нас самих.»": ["«Happiness depends on us.»", "«La felicidad depende de nosotros mismos.»", "«La felicità dipende da noi stessi.»", "«幸せは自分次第。»"], "«Терпение и труд всё перетрут.»": ["«Patience and hard work overcome anything.»", "«La paciencia y el esfuerzo todo lo pueden.»", "«La pazienza e l'impegno superano ogni ostacolo.»", "«忍耐と努力があれば、何でも乗り越えられる。»"], "«Кто хочет — ищет возможности, кто не хочет — ищет причины.»": ["«Those who want to find a way; those who don’t find excuses.»", "«Quien quiere busca oportunidades; quien no, busca excusas.»", "«Chi vuole cerca opportunità; chi non vuole cerca scuse.»", "«やる気がある人は方法を探し、ない人は言い訳を探す。»"], "«Сегодняшний день — ученик вчерашнего.»": ["«Today is yesterday’s student.»", "«Hoy es el alumno de ayer.»", "«Oggi è l'allievo di ieri.»", "«今日は昨日から学ぶ。»"], "«Лучшее время посадить дерево было двадцать лет назад. Второе лучшее — сейчас.»": ["«The best time to plant a tree was twenty years ago. The second-best time is now.»", "«El mejor momento para plantar un árbol fue hace veinte años. El segundo mejor es ahora.»", "«Il momento migliore per piantare un albero era vent'anni fa. Il secondo migliore è adesso.»", "«木を植えるのに最もよい時期は二十年前。次によいのは今。»"], "«Действие — основа всякого успеха.»": ["«Action is the foundation of all success.»", "«La acción es la base de todo éxito.»", "«L'azione è alla base di ogni successo.»", "«行動はすべての成功の土台。»"], "«Капля точит камень не силой, а частым падением.»": ["«A drop wears away stone not by force, but by falling often.»", "«La gota horada la piedra no por su fuerza, sino por caer una y otra vez.»", "«La goccia scava la pietra non con la forza, ma cadendo di continuo.»", "«水滴が石を削るのは、力ではなく、落ち続けるから。»"], "«Тот, кто двигает горы, начинает с малых камней.»": ["«Those who move mountains start with small stones.»", "«Quien mueve montañas empieza con piedras pequeñas.»", "«Chi sposta le montagne comincia dalle piccole pietre.»", "«山を動かす人も、小さな石から始める。»"], "«Сила не в том, чтобы никогда не падать, а в том, чтобы вставать.»": ["«Strength isn’t never falling; it’s getting back up.»", "«La fuerza no está en no caer nunca, sino en volver a levantarse.»", "«La forza non sta nel non cadere mai, ma nel rialzarsi.»", "«強さとは、転ばないことではなく、立ち上がること。»"], "«Чтобы дойти до цели, надо прежде всего идти.»": ["«To reach your goal, you must first start walking.»", "«Para llegar a la meta, primero hay que ponerse en marcha.»", "«Per raggiungere la meta, bisogna prima mettersi in cammino.»", "«目標にたどり着くには、まず歩き出そう。»"], "«Жизнь — это движение. Двигайся, и она ответит.»": ["«Life is movement. Keep moving, and life will respond.»", "«La vida es movimiento. Muévete y te responderá.»", "«La vita è movimento. Muoviti e ti risponderà.»", "«人生は動くこと。動けば、人生も応えてくれる。»"], "«Усердие — мать удачи.»": ["«Diligence is the mother of good luck.»", "«La diligencia es la madre de la buena suerte.»", "«La diligenza è la madre della fortuna.»", "«勤勉は幸運の母。»"], "«Препятствия — это то, что мы видим, когда отводим взгляд от цели.»": ["«Obstacles are what we see when we take our eyes off the goal.»", "«Los obstáculos son lo que vemos cuando apartamos la vista de la meta.»", "«Gli ostacoli sono ciò che vediamo quando distogliamo lo sguardo dalla meta.»", "«目標から目をそらしたときに見えるものが、障害だ。»"], "«Дисциплина — мост между целью и достижением.»": ["«Discipline is the bridge between goals and achievement.»", "«La disciplina es el puente entre las metas y los logros.»", "«La disciplina è il ponte tra gli obiettivi e i risultati.»", "«規律は目標と達成をつなぐ橋。»"], "«Маленькие шаги каждый день приводят к большим переменам.»": ["«Small steps every day lead to big changes.»", "«Los pequeños pasos de cada día llevan a grandes cambios.»", "«Piccoli passi ogni giorno portano a grandi cambiamenti.»", "«毎日の小さな一歩が大きな変化につながる。»"], "«Сначала ты делаешь привычки, потом привычки делают тебя.»": ["«First you make your habits, then your habits make you.»", "«Primero creas tus hábitos; luego tus hábitos te forman.»", "«Prima crei le tue abitudini, poi le tue abitudini formano te.»", "«最初は自分が習慣をつくり、やがて習慣が自分をつくる。»"], "«Кто рано встаёт, тому весь мир помогает.»": ["«The whole world helps those who rise early.»", "«A quien madruga, el mundo entero le ayuda.»", "«A chi si alza presto, il mondo intero dà una mano.»", "«早起きする人には、世界中が味方する。»"], "«Не сравнивай себя с другими. Сравнивай себя с собой вчерашним.»": ["«Don’t compare yourself to others. Compare yourself to who you were yesterday.»", "«No te compares con los demás. Compárate con quien eras ayer.»", "«Non confrontarti con gli altri. Confrontati con chi eri ieri.»", "«他人と比べず、昨日の自分と比べよう。»"], "«Тело достигает того, во что верит ум.»": ["«The body achieves what the mind believes.»", "«El cuerpo logra lo que la mente cree posible.»", "«Il corpo raggiunge ciò in cui la mente crede.»", "«心が信じることを、体は成し遂げる。»"], "«Великое начинается с решения попробовать.»": ["«Great things begin with the decision to try.»", "«Las grandes cosas empiezan con la decisión de intentarlo.»", "«Le grandi cose iniziano con la decisione di provarci.»", "«偉大なことは、挑戦すると決めることから始まる。»"], "«Тише едешь — дальше будешь.»": ["«Slow and steady wins the race.»", "«Sin prisa, se llega más lejos.»", "«Chi va piano va sano e va lontano.»", "«急がば回れ。»"], "«Если устал — отдохни, но не сдавайся.»": ["«If you’re tired, rest—but don’t give up.»", "«Si te cansas, descansa, pero no te rindas.»", "«Se sei stanco, riposati, ma non arrenderti.»", "«疲れたら休もう。でも諦めないで。»"], "«Каждый мастер когда-то был новичком.»": ["«Every expert was once a beginner.»", "«Todo experto fue principiante alguna vez.»", "«Ogni esperto è stato un principiante.»", "«どんな達人も、かつては初心者だった。»"], "«Сила воли — это мышца: чем больше тренируешь, тем крепче.»": ["«Willpower is a muscle: the more you train it, the stronger it gets.»", "«La fuerza de voluntad es un músculo: cuanto más la entrenas, más fuerte se vuelve.»", "«La forza di volontà è un muscolo: più la alleni, più diventa forte.»", "«意志の力は筋肉と同じ。鍛えるほど強くなる。»"], "«Лучше сделать и сожалеть, чем не сделать и жалеть.»": ["«Better to do it and regret it than not do it and wonder what if.»", "«Más vale hacerlo y arrepentirse que no hacerlo y quedarse con las ganas.»", "«Meglio farlo e pentirsene che non farlo e rimpiangerlo.»", "«やらずに後悔するより、やって後悔しよう。»"], "«Победа любит подготовку.»": ["«Victory favors the prepared.»", "«La victoria favorece a quienes se preparan.»", "«La vittoria favorisce chi si prepara.»", "«勝利は準備した人に味方する。»"], "«Здоровье — первое богатство.»": ["«Health is the greatest wealth.»", "«La salud es la mayor riqueza.»", "«La salute è la prima ricchezza.»", "«健康は何よりの財産。»"], "«Движение — кладовая жизни.»": ["«Movement is the storehouse of life.»", "«El movimiento es la reserva de la vida.»", "«Il movimento è la riserva della vita.»", "«動くことは生命の宝庫。»"], "«Ходьба — лучшее лекарство для человека.»": ["«Walking is the best medicine for people.»", "«Caminar es la mejor medicina para las personas.»", "«Camminare è la migliore medicina per le persone.»", "«歩くことは人にとって最高の薬。»"], "«В здоровом теле — здоровый дух.»": ["«A healthy mind in a healthy body.»", "«Mente sana en cuerpo sano.»", "«Mente sana in corpo sano.»", "«健全な精神は健全な肉体に宿る。»"], "«Будь тем изменением, которое хочешь видеть в мире.»": ["«Be the change you wish to see in the world.»", "«Sé el cambio que quieres ver en el mundo.»", "«Sii il cambiamento che vuoi vedere nel mondo.»", "«世界に望む変化に、あなた自身がなろう。»"], "«Жизнь измеряется не числом вдохов, а моментами, что захватывают дух.»": ["«Life is measured not by the number of breaths we take, but by the moments that take our breath away.»", "«La vida no se mide por las veces que respiramos, sino por los momentos que nos dejan sin aliento.»", "«La vita non si misura dal numero di respiri, ma dai momenti che ci tolgono il fiato.»", "«人生は呼吸の数ではなく、息をのむ瞬間で測られる。»"], "«Делай что можешь, тем что есть, там где ты есть.»": ["«Do what you can, with what you have, where you are.»", "«Haz lo que puedas, con lo que tengas, donde estés.»", "«Fai ciò che puoi, con ciò che hai, dove sei.»", "«今いる場所で、手元にあるもので、できることをしよう。»"], "«Трудности готовят обычных людей к необычной судьбе.»": ["«Hardships prepare ordinary people for an extraordinary destiny.»", "«Las dificultades preparan a las personas comunes para un destino extraordinario.»", "«Le difficoltà preparano le persone comuni a un destino straordinario.»", "«困難は、普通の人を並外れた運命へと備えさせる。»"], "«Никогда не поздно стать тем, кем ты мог бы быть.»": ["«It's never too late to become who you might have been.»", "«Nunca es tarde para convertirte en quien podrías haber sido.»", "«Non è mai troppo tardi per diventare ciò che avresti potuto essere.»", "«なれたかもしれない自分になるのに、遅すぎることはない。»"], "«Кто владеет собой, тот владеет миром.»": ["«Whoever masters themselves masters the world.»", "«Quien se domina a sí mismo domina el mundo.»", "«Chi padroneggia sé stesso padroneggia il mondo.»", "«自分を制する者は、世界を制する。»"], "«Сложности укрепляют ум, как труд укрепляет тело.»": ["«Difficulties strengthen the mind, as work strengthens the body.»", "«Las dificultades fortalecen la mente, como el trabajo fortalece el cuerpo.»", "«Le difficoltà rafforzano la mente, come il lavoro rafforza il corpo.»", "«困難が心を鍛えるように、労働は体を鍛える。»"], "«Пока дышу — надеюсь.»": ["«While I breathe, I hope.»", "«Mientras respiro, espero.»", "«Finché respiro, spero.»", "«息ある限り、希望はある。»"], "«Удача сопутствует смелым.»": ["«Fortune favors the bold.»", "«La fortuna favorece a los audaces.»", "«La fortuna aiuta gli audaci.»", "«幸運は勇者に味方する。»"], "«Знание — сила.»": ["«Knowledge is power.»", "«El conocimiento es poder.»", "«La conoscenza è potere.»", "«知識は力なり。»"], "«Свобода — это познанная необходимость.»": ["«Freedom is the recognition of necessity.»", "«La libertad es el reconocimiento de la necesidad.»", "«La libertà è il riconoscimento della necessità.»", "«自由とは、必然性を認識することだ。»"], "«Ничто великое в мире не совершалось без страсти.»": ["«Nothing great in the world has ever been accomplished without passion.»", "«Nada grande en el mundo se ha logrado sin pasión.»", "«Nulla di grande al mondo è mai stato compiuto senza passione.»", "«情熱なくして、この世で偉大なことが成し遂げられたことはない。»"], "«Имей мужество пользоваться собственным умом.»": ["«Have the courage to use your own understanding.»", "«Ten el valor de usar tu propio entendimiento.»", "«Abbi il coraggio di usare il tuo intelletto.»", "«自分の知性を使う勇気を持て。»"], "«Что не убивает меня, делает меня сильнее.»": ["«What doesn't kill me makes me stronger.»", "«Lo que no me mata me hace más fuerte.»", "«Ciò che non mi uccide mi rende più forte.»", "«私を殺さないものは、私を強くする。»"], "«Тот, у кого есть зачем жить, выдержит почти любое как.»": ["«He who has a why to live can bear almost any how.»", "«Quien tiene un porqué para vivir puede soportar casi cualquier cómo.»", "«Chi ha un perché per vivere può sopportare quasi ogni come.»", "«生きる「なぜ」を持つ者は、ほぼどんな「どうやって」にも耐えられる。»"], "«Дерзай быть мудрым — и начинай.»": ["«Dare to be wise—and begin.»", "«Atrévete a ser sabio y empieza.»", "«Osa essere saggio e comincia.»", "«賢くある勇気を持て。そして始めよ。»"], "«Время — самое ценное, что у нас есть.»": ["«Time is the most precious thing we have.»", "«El tiempo es lo más valioso que tenemos.»", "«Il tempo è la cosa più preziosa che abbiamo.»", "«時間は、私たちが持つ最も大切なもの。»"], "«Сделай первый шаг с верой. Необязательно видеть всю лестницу.»": ["«Take the first step in faith. You don’t have to see the whole staircase.»", "«Da el primer paso con fe. No hace falta ver toda la escalera.»", "«Fai il primo passo con fede. Non devi vedere tutta la scala.»", "«信じて最初の一歩を踏み出そう。階段の先まで見えなくてもいい。»"], "«Самая длинная дорога начинается под ногами.»": ["«Even the longest road begins beneath your feet.»", "«Hasta el camino más largo empieza bajo tus pies.»", "«Anche la strada più lunga comincia sotto i tuoi piedi.»", "«どんなに長い道も、足元から始まる。»"], "«Тот, кто хочет, делает больше, чем тот, кто может.»": ["«Those who want to do more than those who can.»", "«Quien quiere hace más que quien puede.»", "«Chi vuole fa più di chi può.»", "«やる気のある人は、できるだけの人より多くを成し遂げる。»"], "«Маленькая ежедневная победа — путь к большой мечте.»": ["«Small daily wins lead to big dreams.»", "«Las pequeñas victorias diarias te acercan a un gran sueño.»", "«Le piccole vittorie quotidiane portano ai grandi sogni.»", "«毎日の小さな勝利が、大きな夢への道になる。»"], "«Энергия и упорство покоряют всё.»": ["«Energy and persistence conquer all.»", "«La energía y la perseverancia lo conquistan todo.»", "«Energia e perseveranza conquistano tutto.»", "«活力と粘り強さがあれば、何でも乗り越えられる。»"], "«Не бойся медленного роста, бойся стоять на месте.»": ["«Don’t fear slow progress; fear standing still.»", "«No temas avanzar despacio; teme quedarte inmóvil.»", "«Non temere di avanzare lentamente; temi di restare fermo.»", "«進みが遅いことを恐れず、立ち止まることを恐れよう。»"], "«Привычка — вторая натура.»": ["«Habit is second nature.»", "«El hábito es una segunda naturaleza.»", "«L’abitudine è una seconda natura.»", "«習慣は第二の天性。»"], "«Жизнь любит тех, кто не сдаётся.»": ["«Life rewards those who don’t give up.»", "«La vida favorece a quienes no se rinden.»", "«La vita premia chi non si arrende.»", "«人生は、諦めない人に味方する。»"], "«Будь как вода: мягкая, но точит камень.»": ["«Be like water: gentle, yet able to wear down stone.»", "«Sé como el agua: suave, pero capaz de desgastar la piedra.»", "«Sii come l’acqua: delicata, ma capace di consumare la pietra.»", "«水のようにあろう。柔らかくても、石を削る力がある。»"], "«Завтрашний успех рождается из сегодняшнего усилия.»": ["«Tomorrow’s success begins with today’s effort.»", "«El éxito de mañana nace del esfuerzo de hoy.»", "«Il successo di domani nasce dall’impegno di oggi.»", "«明日の成功は、今日の努力から生まれる。»"], "«Чем тяжелее путь, тем красивее вершина.»": ["«The harder the climb, the more beautiful the view from the top.»", "«Cuanto más duro sea el camino, más hermosa será la cima.»", "«Più duro è il cammino, più bella è la vetta.»", "«道が険しいほど、頂上は美しい。»"], "«Радость в движении, счастье в пути.»": ["«Find joy in movement and happiness in the journey.»", "«La alegría está en moverse; la felicidad, en el camino.»", "«La gioia è nel movimento, la felicità nel cammino.»", "«動くことに喜びを、歩む道に幸せを。»"], "«Каждый шаг приближает к цели, даже маленький.»": ["«Every step brings you closer to your goal, even a small one.»", "«Cada paso te acerca a tu meta, por pequeño que sea.»", "«Ogni passo ti avvicina alla meta, anche il più piccolo.»", "«どんなに小さな一歩も、目標に近づけてくれる。»"], "«Сила рождается в усилии.»": ["«Strength is born from effort.»", "«La fuerza nace del esfuerzo.»", "«La forza nasce dall’impegno.»", "«強さは努力から生まれる。»"], "«Великие реки начинаются с малых ручьёв.»": ["«Great rivers begin as small streams.»", "«Los grandes ríos empiezan como pequeños arroyos.»", "«I grandi fiumi nascono da piccoli ruscelli.»", "«大河も小さな流れから始まる。»"], "«Лучшая инвестиция — в собственное здоровье.»": ["«The best investment is in your health.»", "«La mejor inversión es en tu salud.»", "«Il miglior investimento è nella tua salute.»", "«最高の投資は、自分の健康への投資。»"], "«Кто бежит за двумя зайцами, не поймает ни одного — выбери цель.»": ["«Chase two rabbits and you’ll catch neither — choose one goal.»", "«Quien persigue dos liebres no atrapa ninguna: elige una meta.»", "«Chi insegue due lepri non ne prende nessuna: scegli un obiettivo.»", "«二兎を追う者は一兎をも得ず。目標を一つ選ぼう。»"], "«Победи лень сегодня — и завтра скажешь спасибо.»": ["«Beat laziness today — you’ll thank yourself tomorrow.»", "«Vence la pereza hoy y mañana te lo agradecerás.»", "«Vinci la pigrizia oggi e domani te ne sarai grato.»", "«今日、怠け心に勝とう。明日の自分が感謝する。»"], "«Тот, кто встал на путь, уже наполовину у цели.»": ["«Once you’ve started, you’re halfway to your goal.»", "«Quien emprende el camino ya está a mitad de la meta.»", "«Chi si mette in cammino è già a metà strada verso la meta.»", "«一歩を踏み出せば、もう目標の半分まで来ている。»"], "«Делай сегодня то, за что завтра скажешь себе спасибо.»": ["«Do something today that you’ll thank yourself for tomorrow.»", "«Haz hoy algo que mañana te agradecerás.»", "«Fai oggi qualcosa per cui domani ringrazierai te stesso.»", "«明日の自分が感謝することを、今日やろう。»"], "«Ум растёт от знаний, тело — от движения.»": ["«The mind grows through knowledge, the body through movement.»", "«La mente crece con el conocimiento; el cuerpo, con el movimiento.»", "«La mente cresce con la conoscenza, il corpo con il movimento.»", "«知識は心を、運動は体を育てる。»"], "«Не жди вдохновения — начни, и оно придёт.»": ["«Don’t wait for inspiration—start, and it will come.»", "«No esperes a la inspiración: empieza y llegará.»", "«Non aspettare l’ispirazione: inizia e arriverà.»", "«やる気を待たずに始めよう。やる気は後からついてくる。»"], "«Мечта без действия остаётся мечтой.»": ["«A dream without action remains a dream.»", "«Un sueño sin acción sigue siendo un sueño.»", "«Un sogno senza azione resta un sogno.»", "«行動しなければ、夢は夢のまま。»"], "«Маленькая дисциплина рождает большую свободу.»": ["«A little discipline brings great freedom.»", "«Un poco de disciplina trae mucha libertad.»", "«Un po’ di disciplina porta grande libertà.»", "«小さな自律が大きな自由を生む。»"], "«Каждое утро — новый шанс стать лучше.»": ["«Every morning is a new chance to improve.»", "«Cada mañana es una nueva oportunidad para mejorar.»", "«Ogni mattina è una nuova occasione per migliorare.»", "«毎朝が、自分を磨く新しいチャンス。»"], "«Терпеливый достигает большего, чем сильный.»": ["«The patient achieve more than the strong.»", "«Quien tiene paciencia llega más lejos que quien tiene fuerza.»", "«Chi ha pazienza ottiene più di chi ha forza.»", "«力のある人より、忍耐強い人のほうが遠くへ行ける。»"], "«Сердце, полное цели, не знает усталости.»": ["«A heart filled with purpose knows no fatigue.»", "«Un corazón lleno de propósito no conoce el cansancio.»", "«Un cuore pieno di determinazione non conosce stanchezza.»", "«目標に満ちた心は、疲れを知らない。»"], "«Дорога становится легче, когда идёшь по ней каждый день.»": ["«The path gets easier when you walk it every day.»", "«El camino se hace más fácil cuando lo recorres cada día.»", "«Il cammino diventa più facile se lo percorri ogni giorno.»", "«毎日歩けば、道は少しずつ楽になる。»"], "«Кто верит в себя, тот уже на полпути к успеху.»": ["«Believe in yourself, and you’re halfway to success.»", "«Si crees en ti, ya estás a medio camino del éxito.»", "«Se credi in te, sei già a metà strada verso il successo.»", "«自分を信じれば、成功への道はもう半分。»"], "«Не количество, а постоянство решает.»": ["«Consistency matters more than quantity.»", "«Lo que cuenta no es la cantidad, sino la constancia.»", "«Conta la costanza, non la quantità.»", "«大切なのは量より継続。»"], "«Сделанное сегодня — фундамент завтрашнего.»": ["«What you do today lays the foundation for tomorrow.»", "«Lo que haces hoy sienta las bases del mañana.»", "«Ciò che fai oggi getta le basi per domani.»", "«今日の積み重ねが、明日の土台になる。»"], "«Сила в спокойствии, спокойствие в движении.»": ["«Strength lies in calm, and calm in movement.»", "«La fuerza está en la calma; la calma, en el movimiento.»", "«La forza sta nella calma, la calma nel movimento.»", "«強さは落ち着きの中に、落ち着きは動きの中に。»"], "«Лучший день начать — сегодня.»": ["«The best day to start is today.»", "«El mejor día para empezar es hoy.»", "«Il giorno migliore per iniziare è oggi.»", "«始めるなら、今日がいちばん。»"], "«Шаг за шагом — и гора покорится.»": ["«Step by step, you’ll conquer the mountain.»", "«Paso a paso, conquistarás la montaña.»", "«Passo dopo passo, conquisterai la montagna.»", "«一歩ずつ進めば、山も越えられる。»"], "«Тот, кто продолжает, побеждает.»": ["«Those who keep going win.»", "«Quien sigue adelante, gana.»", "«Chi non si ferma, vince.»", "«続ける人が勝つ。»"], "«Доверься пути — он ведёт сильных.»": ["«Trust the path—it guides the strong.»", "«Confía en el camino: guía a los fuertes.»", "«Fidati del cammino: guida i forti.»", "«道を信じよう。強い人を導いてくれる。»"], "«Хорошее начало — половина успеха.»": ["«A good start is half the battle.»", "«Un buen comienzo es la mitad del éxito.»", "«Chi ben comincia è a metà dell’opera.»", "«良いスタートは成功の半分。»"], "«Учись так, словно будешь жить вечно; живи так, словно умрёшь завтра.»": ["«Learn as if you’ll live forever; live as if you’ll die tomorrow.»", "«Aprende como si fueras a vivir para siempre; vive como si fueras a morir mañana.»", "«Impara come se dovessi vivere per sempre; vivi come se dovessi morire domani.»", "«永遠に生きるかのように学び、明日死ぬかのように生きよう。»"], "«Кто ясно мыслит — ясно действует.»": ["«Clear thinking leads to clear action.»", "«Quien piensa con claridad actúa con claridad.»", "«Chi pensa con chiarezza agisce con chiarezza.»", "«明晰に考える人は、迷わず行動する。»"], "«Спокойный ум — сильное тело.»": ["«A calm mind, a strong body.»", "«Mente serena, cuerpo fuerte.»", "«Mente calma, corpo forte.»", "«穏やかな心、強い体。»"], "«Стань рекой: течёшь — значит живёшь.»": ["«Be like a river: to flow is to live.»", "«Sé como un río: fluir es vivir.»", "«Sii come un fiume: scorrere è vivere.»", "«川のようになろう。流れることは、生きること。»"], "«Всё течёт, всё меняется — меняйся к лучшему.»": ["«Everything flows, everything changes—change for the better.»", "«Todo fluye, todo cambia: cambia para mejor.»", "«Tutto scorre, tutto cambia: cambia in meglio.»", "«すべては流れ、変わっていく。あなたもより良く変わろう。»"], "«Цени каждый день как подарок.»": ["«Treasure each day as a gift.»", "«Valora cada día como un regalo.»", "«Apprezza ogni giorno come un dono.»", "«毎日を贈り物として大切にしよう。»"], "«Богат не тот, у кого много, а тот, кому достаточно.»": ["«Rich is not the one who has much, but the one who has enough.»", "«Rico no es quien tiene mucho, sino quien tiene suficiente.»", "«Ricco non è chi ha molto, ma chi ha abbastanza.»", "«豊かなのは、多くを持つ人ではなく、足るを知る人。»"], "«Действуй так, будто от тебя зависит всё.»": ["«Act as if everything depends on you.»", "«Actúa como si todo dependiera de ti.»", "«Agisci come se tutto dipendesse da te.»", "«すべてが自分にかかっているつもりで行動しよう。»"], "«Малое усилие сегодня — большое преимущество завтра.»": ["«A little effort today, a big advantage tomorrow.»", "«Un pequeño esfuerzo hoy, una gran ventaja mañana.»", "«Un piccolo sforzo oggi, un grande vantaggio domani.»", "«今日の小さな努力が、明日の大きな強みになる。»"], "«Воля и труд человека дивные дивы творят.»": ["«Willpower and hard work can work wonders.»", "«La voluntad y el esfuerzo pueden hacer maravillas.»", "«La volontà e l'impegno possono fare meraviglie.»", "«意志と努力は、驚くべきことを成し遂げる。»"], "«Чтобы изменить жизнь, измени один день.»": ["«To change your life, change one day.»", "«Para cambiar tu vida, cambia un día.»", "«Per cambiare la tua vita, cambia una giornata.»", "«人生を変えるなら、まず今日を変えよう。»"], "«Двигайся вперёд, даже если медленно — это всё равно вперёд.»": ["«Keep moving, even slowly — you're still moving forward.»", "«Sigue avanzando, aunque sea despacio: sigues avanzando.»", "«Continua ad avanzare, anche lentamente: stai comunque andando avanti.»", "«ゆっくりでも進み続けよう。それも前進だ。»"], "«Сила привычки сильнее силы желания.»": ["«The power of habit is stronger than the power of desire.»", "«La fuerza del hábito supera a la del deseo.»", "«La forza dell'abitudine supera quella del desiderio.»", "«習慣の力は、願望の力より強い。»"], "«Сделай шаг — и дорога появится.»": ["«Take a step, and the path will appear.»", "«Da un paso y el camino aparecerá.»", "«Fai un passo e la strada apparirà.»", "«一歩踏み出せば、道は開ける。»"], "«Утро добрых дел длиннее дня лени.»": ["«A morning of good deeds goes further than a day of idleness.»", "«Una mañana de buenas acciones rinde más que un día de pereza.»", "«Una mattina di buone azioni vale più di un giorno di pigrizia.»", "«よいことをする朝は、怠けて過ごす一日より実りが多い。»"], "«Ты сильнее, чем думаешь.»": ["«You're stronger than you think.»", "«Eres más fuerte de lo que crees.»", "«Sei più forte di quanto pensi.»", "«あなたは思っているより強い。»"], "«Каждый финиш — это новый старт.»": ["«Every finish is a new start.»", "«Cada meta es un nuevo comienzo.»", "«Ogni traguardo è un nuovo inizio.»", "«ゴールはいつだって新たなスタート。»"], "«Сначала трудно, потом привычно, потом красиво.»": ["«First it's hard, then it becomes a habit, then it feels great.»", "«Primero cuesta, luego se vuelve un hábito y después se disfruta.»", "«All'inizio è dura, poi diventa un'abitudine, infine una gioia.»", "«最初は大変。やがて習慣になり、最後には楽しくなる。»"], "«Дисциплина сегодня — гордость завтра.»": ["«Discipline today, pride tomorrow.»", "«Disciplina hoy, orgullo mañana.»", "«Disciplina oggi, orgoglio domani.»", "«今日の自律が、明日の誇りになる。»"], "«Тот, кто заботится о теле, заботится о будущем.»": ["«Taking care of your body means taking care of your future.»", "«Cuidar tu cuerpo es cuidar tu futuro.»", "«Prendersi cura del proprio corpo significa prendersi cura del proprio futuro.»", "«体を大切にすることは、未来を大切にすること。»"], "«Лучше зажечь свечу, чем проклинать тьму.»": ["«Better to light a candle than curse the darkness.»", "«Mejor encender una vela que maldecir la oscuridad.»", "«Meglio accendere una candela che maledire il buio.»", "«暗闇を嘆くより、ろうそくに火を灯そう。»"], "«Радуйся пути не меньше, чем цели.»": ["«Enjoy the journey as much as the goal.»", "«Disfruta del camino tanto como de la meta.»", "«Goditi il percorso tanto quanto la meta.»", "«目標と同じくらい、そこに至る道のりも楽しもう。»"], "Сервер подключён автоматически для этой версии приложения.": ["The server is connected automatically for this edition.", "El servidor se conecta automáticamente para esta versión.", "Il server viene collegato automaticamente per questa versione.", "このバージョンのサーバーに自動的に接続します。"]};
  Object.keys(QUOTE_EXTRA).forEach(function(k){DICT[k]=QUOTE_EXTRA[k].slice(0,3);JA[k]=QUOTE_EXTRA[k][3];});

  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  var IDX = { en: 0, es: 1, it: 2 };
  var origText = new WeakMap();   // текстовый узел -> исходный русский
  var origAttrs = new WeakMap();  // элемент -> {attr: исходное значение}
  var applying = false;
  var curLang = 'ru';

  function tr(ru, lang) {
    if (lang === 'ru') return null;
    if (lang === 'ja') {
      if (JA[ru] != null) return JA[ru];
      if(DICT[ru]) return DICT[ru][0] || null;
    }
    var patterns=[
      [/^осталось ([\d.]+) км до цели недели$/,['$1 km left to reach your weekly goal','Faltan $1 km para tu objetivo semanal','Mancano $1 km all’obiettivo settimanale','週間目標まであと$1 km']],
      [/^цель выполнена! \+([\d.]+) км сверху 🎉$/,['Goal reached! $1 km extra 🎉','¡Objetivo alcanzado! $1 km extra 🎉','Obiettivo raggiunto! $1 km extra 🎉','目標達成！さらに$1 km 🎉']],
      [/^всего ([\d.]+) км$/,['$1 km total','$1 km en total','$1 km totali','合計$1 km']],
      [/^([\d:]+) \/км$/,['$1 /km','$1 /km','$1 /km','$1 /km']]
    ];
    for(var n=0;n<patterns.length;n++){if(patterns[n][0].test(ru))return ru.replace(patterns[n][0],patterns[n][1][lang==='ja'?3:(IDX[lang]||0)]);}
    var v = DICT[ru];
    if (!v) return null;
    var i = IDX[lang];
    if (i === undefined) i = 0;
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

  window.skTranslate=function(text,lang){return tr(text,lang||currentLang())||text;};
  window.skApplyI18n = apply;   // для ручного вызова из приложения

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
