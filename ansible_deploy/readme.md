# ReadMe
Playbook per il deploy su vm ubuntu/centos.
Requisiti
  - ansible installato sulla vm di controllo
  - accesso in ssh con chiave alla (o alle) vm di destinazione (non necessariamente root)
  - utenza sudoer (l'utente deve poter fare sudo...)

Compilare in targets.yml la lista delle vm su cui deployare daf-dataportal. L'uso di ip o di hostname è indifferente, purchè la vm venga raggiunta correttamente. Se si usano porte non standard, specificarle con ":" dopo l'ip o l'hostname.
```
[daf_target_machines]
55.166.55.188
mioserver.miodominio.it:10022
```
Lanciare ansible-playbook dalla macchina di controllo:
```
$ ansible-playbook -i targets.yml -u utente --private-key=private.key play_deploy.yml
```
dove
- *targets.yml* è il path del file di inventario contentente le macchine di destinazione
- *utente* è lo username di accesso ssh alle macchine remote
- *private.key* è il path della chiave con cui utente si autentica sulle macchine remote
- *play_deploy.yml* è il path del file del playbook vero e proprio

Il playbook deploya per default nella cartella /srv/daf-dataportal. Se si vuole deployare in una cartella differente, specificarlo nella variabile in testa al file play_deploy.yml.
