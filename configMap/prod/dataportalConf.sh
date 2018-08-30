#!/usr/bin/env bash

set -e

kubectl delete configmap dataportal-conf || true

kubectl create configmap dataportal-conf \
--from-literal=apiURLSSOManager="https://api.daf.teamdigitale.it/sso-manager" \
--from-literal=urlSupersetOpen="https://api.open.daf.teamdigitale.it/sso-manager" \
--from-literal=apiURLDatiGov="https://api.daf.teamdigitale.it/dati-gov/v1" \
--from-literal=apiURLCatalog="https://api.daf.teamdigitale.it/catalog-manager/v1" \
--from-literal=apiURLSecurity="https://api.daf.teamdigitale.it/security-manager/v1" \
--from-literal=apiURLDataset="https://api.daf.teamdigitale.it/dataset-manager/v1" \
--from-literal=apiURLHdfs="http://api.daf.teamdigitale.it/hdfs/proxy" \
--from-literal=apiCKAN="https://api.daf.teamdigitale.it/dati-gov/ckan_proxy" \
--from-literal=apiMedium="https://api.daf.teamdigitale.it/dati-gov/medium" \
--from-literal=urlSemantic="https://api.daf.teamdigitale.it/stanbol/ontonethub/ontologies/find" \
--from-literal=urlMetabase="https://graph.daf.teamdigitale.it" \
--from-literal=urlSuperset="https://bi.dataportal.daf.teamdigitale.it" \
--from-literal=urlJupiter="https://datascience.daf.teamdigitale.it" \
--from-literal=urlCkan="https://ckan-geo.daf.teamdigitale.it/" \
--from-literal=urlKatalod="https://api.daf.teamdigitale.it/daf-semantic-katalod" \
--from-literal=domain=".daf.teamdigitale.it"