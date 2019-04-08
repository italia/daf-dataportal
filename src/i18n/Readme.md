# Struttura del codice 
Il codice è stato pensato per agevolare la modifica o l'aggiunta dei vari step anche da persone che hanno poca dimestichezza con il codice.
E' possibile trovare l'intera struttura alla voce **gettingStarted** nel file `i18n-ita.js` presente nel progetto.
All'interno del file JSON sono presenti 2 etichette (titolo e descrizione), racchiuse in delle parentesi graffe **{ }**.
L'etichetta **titolo** permette di aggiungere una piccola descrizione all'interno della barra step del portale, mentre l'etichetta **descrizione** permette di aggiungere del testo che verrà visualizzato una volta cliccato su quel determinato step.

Es.

gettingStarted: [

{ step:  0,

titolo:  'Lorem ipsum dolor sit amet',
descrizione:  `Lorem ipsum dolor sit amet, consectetur adipiscing elit...`
},

{
step:  1,

titolo:  'Lorem ipsum dolor sit amet',
descrizione:  `Aliquam sodales eget mi eget maximus. In id massa congue...`

},
...
]

## Modificare uno step
Recarsi alla voce **gettingStarted**, da qui sarà possibile visualizzare i vari step. Individuare quello di  interesse e modificarlo, per aggiungere una determinata formattazione del testo bisogna usare tag HTML. 
Il testo del **titolo** dovrà essere racchiuso all'intero di singoli apici (**' '**), mentre il testo della **descrizione** all'interno del carattere **backtick** "**`**".

Es.
{
step:  0,

titolo:  'Lorem ipsum dolor sit amet',
descrizione:  `Aliquam sodales eget mi eget maximus. In id massa congue...`
},

## Aggiungere uno step

Recarsi alla voce **gettingStarted**, da qui sarà possibile visualizzare i vari step. Aggiungere la struttura del codice all'intero di parentesi graffe, dopodiché sarà possibile aggiungere il testo desiderato.

Es. 
[
....
{
step:  10,

titolo:  'Lorem ipsum dolor sit amet',
descrizione:  `Aliquam sodales eget mi eget maximus. In id massa congue...`
},
]

Per aggiungere una determinata formattazione del testo bisogna usare tag HTML. 
Il testo del **titolo** dovrà essere racchiuso all'intero di singoli apici (**' '**), mentre il testo della **descrizione** all'interno del carattere **backtick** "**`**".

## Eliminare uno step
Recarsi alla voce **gettingStarted**, da qui sarà possibile visualizzare i vari step. Individuare quello da eliminare, selezionarlo ed eliminare o commentare il codice, comprese le parentesi graffe e la virgola finale.
