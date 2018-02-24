





Introduzione:

Travel World è una applicazione per smartphone che permette di trovare ad un                                 turista delle attività( nel nostro caso chiamate anche esperienze ) diverse da quelle offerte in genere da una organizzazione privata ( o comunale ) . L’obiettivo è quello di far vivere la città al turista portandolo ad attività enogastronomiche offerte direttamente dagli abitanti di quella località , ad attività turistiche come ad esempio la visita della periferia di una città  e sportive . Una delle feature più importanti è data dal fatto che una attività può essere inserita da un utente privato


Potenziali utenti:

Tra coloro che sicuramente possono trovare utile questo applicativo ci sono i tanti 
turisti che vogliono conoscere di una città non solo quello che abitualmente si vede negli opuscoli o su wikipedia  ovvero non vogliono essere solo turisti ma vogliono invece “scoprire” la città in tutte le sue sfaccettature scoprendo posti unici magari che non sono riportati nel catalogo . 
Ulteriore potenziale utente è il cittadino che ad esempio vuole fare provare i prodotti tipici del suo paese ad un turista , magari guadagnando anche qualcosa .


Frontend :

Per realizzare l’app è stata utilizzato React Native .


Librerie e componenti utilizzate : 

native-base : quasi tutta la parte grafica di travel world è stata implementata utilizzando questa libreria. La documentazione è disponibile nel seguente link:https://docs.nativebase.io/Components.html#Components


react-navigation: questa libreria ci ha aiutati nella gestione della navigazione di travel world , per passare da una pagina ad un’ altra  . La documentazione è disponibile nel seguente link:  https://reactnavigation.org/docs/intro/



react-native-datepicker: questo componente è stato utilizzato per selezionare la data quando viene aggiunta una nuova attività . La documentazione di questo componente è disponibile nel seguente link: https://github.com/xgfe/react-native-ui-xg/blob/master/components/Drawer/README.md

react-native-fetch-blob: // MARCO


react-native-geocoding: questa libreria ci è servita per convertire l’indirizzo ,il numero civico , la città e il CAP associato all’inserimento di una attività , in latitudine e longitudine utilizzate per restituire una mappa all’utente. La documentazione è disponibile nel seguente link : https://github.com/devfd/react-native-geocoder/blob/master/README.md

ExpoSDK :  In particolare sono state utilizzate le API LinearGradient con la quale vengono renderizzate le view con un gradient . La documentazione è disponibile al seguente link : https://docs.expo.io/versions/latest/sdk/index.html

Nella realizzazione di tutto il progetto ci hanno aiutato i middleware Logger utile a capire cosa accade quando si passa da uno stato ad un altro , e Redux-Thunk


Backend:

Tutta la parte di Backend è stata gestita utilizzando le API fornite da FIREBASE .
Abbiamo strutturato il database creando 4 tabelle :

USERS : Questa tabella utilizza come chiave l’UID dell’utente ( quello che viene assegnato quando un utente si logga nell’app ) il valore è rappresentato da un ulteriore oggetto che contiene : age( età ) , name ( nome ) , phone ( numero di telefono ) , url ( link relativo all’immagine del profilo di un utente ) .

USERCART : Anche qui abbiamo utilizzato come chiave l’UID come valore possiamo più oggetti ( che hanno come chiave quella relativa ad una attività ,quindi risulta chiaro che un utente può aggiungere nel suo carrello quante esperienze vuole ) ogni oggetto contiene :  ActivityKey( la chiave dell’attività ) ,AdvertiserKey ( cioè la chiave che identifica l’utente che ha inserito l’esperienza ) , nameActivity ( il nome dell’esperienza ) e type ( ovvero il tipo di esperienza ).

CITYEXPERIENCE: rappresenta le attività aggiunte dagli utenti ogni oggetto contiene informazioni relative al luogo nella quale si svolgerà l’attività , come città , indirizzo e cap . Il numero di posti a disposizione per l’attività , la data di svolgimento , il tipo di esperienza  e l’utente che l’ha inserita . 

CITY: contiene le città che sono disponibili per l’applicazione , al momento sono soltanto 3 (Roma ,Milano ,Catania) ma possono essere aggiunte dinamicamente .




Funzionalità:

Per poter utilizzare l’applicazione la prima operazione da effettuare è la registrazione.
Quest’ultima chiede all’utente di inserire due parametri che sono la sua email e una password(più lunga di 6 caratteri ) .

SCREEN


Dopo essersi registrato l’utente può accedere all’applicazione inserendo email e password . Se si era registrato e non ci sono errori nei due parametri di input , allora l’utente sarà reindirizzato alla schermata principale 


// SCREEN LOGIN E SCHERMATA PRINCIPALE


Se l’utente non entra nell’app da tanto tempo probabilmente non si ricorderà la password , ed è proprio per questo motivo che è presente la funzionalità “Hai dimenticato la password” . Basterà inserire la propria email , e se l’utente precedentemente si era registrato allora riceverà un email per resettare la password.


// SCREEN FORGOT  E EMAIL RICEVUTA.

Una delle feature più importanti che react-native ci ha dato è la differenziazione della schermata principale tra un utente che possiede un dispositivo Apple(quindi con sistema operativo IOS ) , e un utente che possiede uno smartphone Android . La maggior parte delle applicazioni (telegram ,whatsapp...) anche se con le stesse funzionalità hanno differenziano l’esperienza utente tra i due sistemi . Noi un (anche se un minimo  ) abbiamo provato a farlo .

Nel caso di android infatti è presente un menù a tendina , mentre per i dispositivi apple le voci del menù si trovano nella parte bassa dell’app .
Dal menù possiamo accedere alle seguenti funzionalità :

Mio profilo: In questa pagina posso aggiungere informazioni al mio profilo come il nome, l’età e il numero telefonico , inoltre è possibile inserire un immagine profilo .

// screen edit profilo .

Aggiungi esperienza : Questa opzione mi consente di aggiungere un’attività che un utente vuole proporre . E’ divisa in tre pagine , la prima dove viene chiesto di dare un nome all’attività , di descrivere la proposta  e di selezionare una data , la seconda parte consiste nel selezionare il tipo di esperienza ovvero selezionare tra cibo sport e turismo . Dopo aver cliccato in una delle 3 opzioni si viene reindirizzati nell’ultima screen che chiede il numero massimo di partecipanti per l’attività e altri campi come via , numero civico , cap e città nella quale verrà svolta un attività . In quest’ultima pagina e presente il tasto invia che consente di inserire l’attività nel database in modo che tutti potranno vederla . se alcuni campi non sono stati completati sarà visualizzato un messaggio che chiederà di risolvere il problema .

// tre screen .

Nella schermata principale sono presenti 3 card che rappresentano le città in cui  possiamo trovare le attività inserite dagli utenti . Se clicchiamo su una di queste card andremo in un’altra pagina dove le attività vengono ulteriormente filtrate in 3 categorie : cibo , turismo e sport . andando ancora a selezionare una di queste possiamo finalmente vedere le attività disponibili per la città e il tipo selezionato.

// SCREEN FILTRAGGIO TIPO E HOME


Adesso possiamo scegliere tra le attività che più ci attirano . selezionando una esperienza otteniamo informazioni come il nome , l’email dell’utente che ha messo l’inserzione , il numero di telefono e una mappa che mi indica il luogo di incontro per l’attività . Se l’utente vuole vivere una di queste attività basta premere “Aggiungi” (se i posti a disposizione non sono esauriti ).

//SCREEN ATTIVITA’ (CON MAPPA)

Tra le feature abbiamo la possibilità di controllare le attività che abbiamo selezionato andando su “mie esperienze” .

//SCREEN ;




  
