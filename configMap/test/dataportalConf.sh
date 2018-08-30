#!/usr/bin/env bash

set -e

kubectl delete configmap dataportal-conf || true

kubectl create configmap dataportal-conf \
--from-literal=apiURLSSOManager="https://api.daf.teamdigitale.test/sso-manager" \
--from-literal=urlSupersetOpen="https://api.open.daf.teamdigitale.test/sso-manager" \
--from-literal=apiURLDatiGov="https://api.daf.teamdigitale.test/dati-gov/v1" \
--from-literal=apiURLCatalog="https://api.daf.teamdigitale.test/catalog-manager/v1" \
--from-literal=apiURLSecurity="https://api.daf.teamdigitale.test/security-manager/v1" \
--from-literal=apiURLDataset="https://api.daf.teamdigitale.test/dataset-manager/v1" \
--from-literal=apiURLHdfs="https://api.daf.teamdigitale.test/hdfs/proxy" \
--from-literal=apiCKAN="https://api.daf.teamdigitale.test/dati-gov/ckan_proxy" \
--from-literal=apiMedium="https://api.daf.teamdigitale.test/dati-gov/medium" \
--from-literal=urlSemantic="https://api.daf.teamdigitale.test/stanbol/ontonethub/ontologies/find" \
--from-literal=urlMetabase="https://graph.daf.teamdigitale.test" \
--from-literal=urlSuperset="https://bi.dataportal.daf.teamdigitale.test" \
--from-literal=urlJupiter="https://datascience.daf.teamdigitale.test" \
--from-literal=urlCkan="https://ckan-geo.daf.teamdigitale.test/" \
--from-literal=urlKatalod="https://api.daf.teamdigitale.test/daf-semantic-katalod" \
--from-literal=domain=".daf.teamdigitale.test"