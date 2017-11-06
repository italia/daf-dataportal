const licenze = [
      {
        "notation": "A",
        "rank": "1",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A_OpenLicense",
        "label": "Licenza Aperta",
        "parent_uri": null,
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B",
        "rank": "1",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B_NonOpenLicense",
        "label": "Licenza Non Aperta",
        "parent_uri": null,
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "C",
        "rank": "1",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/C_Unknown",
        "label": "Licenza Sconosciuta",
        "parent_uri": null,
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.1",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A1_PublicDomain",
        "label": "Pubblico Dominio",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A_OpenLicense",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "label": "Attribuzione",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A_OpenLicense",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "label": "Effetto Virale (aka Condivisione allo stesso modo)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A_OpenLicense",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.4",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A4_ShareAlikeCopyleftNonComp",
        "label": "Condivisione allo stesso modo / copyleft non compatibile",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A_OpenLicense",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "label": "Solo Uso non Commerciale",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B_NonOpenLicense",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "label": "Non Opere Derivate",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B_NonOpenLicense",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "C.1",
        "rank": "2",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/C1_Unknown",
        "label": "Licenza Sconosciuta",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/C_Unknown",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.1.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A11_CCO10",
        "label": "Creative Commons CC0 1.0 Universale - Public Domain Dedication (CC0 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A1_PublicDomain",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.1.2",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A12_PDDL",
        "label": "ODC Public Domain Dedication and License (PDDL)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A1_PublicDomain",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A21_CCBY40",
        "label": "Creative Commons Attribuzione 4.0 Internazionale (CC BY 4.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.10",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A210_ODCBY",
        "label": "Open Data Commons Attribution License (ODC_BY)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.2",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A22_CCBY30",
        "label": "Creative Commons Attribuzione 3.0 Unported (CC BY 3.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.3",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A23_CCBY30IT",
        "label": "Creative Commons Attribuzione Italia 3.0 (CC BY 3.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.4",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A24_CCBY25",
        "label": "Creative Commons Attribuzione 2.5 Generica (CC BY 2.5)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.5",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A25_CCBY25IT",
        "label": "Creative Commons Attribuzione 2.5 Italia (CC BY 2.5 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.6",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A26_CCBY20",
        "label": "Creative Commons Attribuzione 2.0 Generica (CC BY 2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.7",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A27_CCBY20IT",
        "label": "Creative Commons Attribuzione 2.0 Italia (CC BY 2.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.8",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A28_CCBY10",
        "label": "Creative Commons Attribuzione 1.0 Generica (CC BY 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.2.9",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A29_IODL20",
        "label": "Italian Open Data License 2.0 (IODL 2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A2_Attribution",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A31_CCBYSA40",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 4.0 Internazionale (CC BY-SA 4.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.10",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A310_ODBL",
        "label": "Open Data Commons Open Database License 1.0 (ODbL)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.11",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A311_GFDL13",
        "label": "GNU Free Documentation License 1.3 (GFDL 1.3)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.2",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A32_CCBYSA30",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 3.0 Unported (CC BY-SA 3.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.3",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A33_CCBYSA30IT",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 3.0 Italia (CC BY-SA 3.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.4",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A34_CCBYSA25",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 2.5 Generica (CC BY-SA 2.5)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.5",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A35_CCBYSA25IT",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 2.5 Italia (CC BY-SA 2.5 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.6",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A36_CCBYSA20",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 2.0 Generica (CC BY-SA 2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.7",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A37_CCBYSA20IT",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 2.0 Italia (CC BY-SA 2.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.8",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A38_CCBYSA10",
        "label": "Creative Commons Attribuzione-Condividi allo stesso modo 1.0 Generica (CC BY-SA 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.3.9",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A39_IODL10",
        "label": "Italian Open Data License 1.0 (IODL 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A3_ShareAlike",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "A.4.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/A41_ADRM",
        "label": "Against DRM (2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/A4_ShareAlikeCopyleftNonComp",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B11_CCBYNC40",
        "label": "Creative Commons Attribuzione-Non Commerciale 4.0 Internazionale (CC BY-NC 4.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.10",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B110_CCBYNCSA30",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 3.0 Unported (CC BY-NC-SA 3.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.11",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B111_CCBYNCSA30IT",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 3.0 Italia (CC BY-NC-SA 3.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.12",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B112_CCBYNCSA25",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.5 Generica (CC BY-NC-SA 2.5)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.13",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B113_CCBYNCSA25IT",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.5 Italia (CC BY-NC-SA 2.5 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.14",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B114_CCBYNCSA20",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.0 Generica (CC BY-NC-SA 2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.15",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B115_CCBYNCSA20IT",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.0 Italia (CC BY-NC-SA 2.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.16",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B116_CCBYNCSA10",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 1.0 Generica (CC BY-NC-SA 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.2",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B12_CCBYNC30",
        "label": "Creative Commons Attribuzione-Non Commerciale 3.0 Unported (CC BY-NC 3.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.3",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B13_CCBYNC30IT",
        "label": "Creative Commons Attribuzione-Non Commerciale 3.0 Italia (CC BY-NC 3.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.4",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B14_CCBYNC25",
        "label": "Creative Commons Attribuzione-Non Commerciale 2.5 Generica (CC BY-NC 2.5)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.5",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B15_CCBYNC25IT",
        "label": "Creative Commons Attribuzione-Non Commerciale 2.5 Italia (CC BY-NC 2.5 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.6",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B16_CCBYNC20",
        "label": "Creative Commons Attribuzione-Non Commerciale 2.0 Generica (CC BY-NC 2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.7",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B17_CCBYNC20IT",
        "label": "Creative Commons Attribuzione-Non Commerciale 2.0 Italia (CC BY-NC 2.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.8",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B18_CCBYNC10",
        "label": "Creative Commons Attribuzione-Non Commerciale 1.0 Generica (CC BY-NC 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.1.9",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B19_CCBYNCSA40",
        "label": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 4.0 Internazionale (CC BY-NC-SA 4.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B1_NonCommercial",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B21_CCBYND40",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 4.0 Internazionale (CC BY-ND 4.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.2",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B22_CCBYND30",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 3.0 Unported (CC BY-ND 3.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.3",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B23_CCBYND30IT",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 3.0 Italia (CC BY-ND 3.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.4",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B24_CCBYND25",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 2.5 Generica (CC BY-ND 2.5)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.5",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B25_CCBYND25IT",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 2.5 Italia (CC BY-ND 2.5 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.6",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B26_CCBYND20",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 2.0 Generica (CC BY-ND 2.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.7",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B27_CCBYND20IT",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 2.0 Italia (CC BY-ND 2.0 IT)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.8",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B28_CCBYND10",
        "label": "Creative Commons Attribuzione-Non Opere Derivate 1.0 Generica (CC BY-ND 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "B.2.9",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/B29_CCBYNDNC10",
        "label": "Creative Commons Attribuzione-Non Opere Derivate-Non Commerciale 1.0 Generica (CC BY-ND-NC 1.0)",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/B2_NoDerivs",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      },
      {
        "notation": "C.1.1",
        "rank": "3",
        "uri": "http://dati.gov.it/onto/controlledvocabulary/License/C11_Unknown",
        "label": "Licenza Sconosciuta",
        "parent_uri": "http://dati.gov.it/onto/controlledvocabulary/License/C1_Unknown",
        "scheme": "http://dati.gov.it/onto/controlledvocabulary/License"
      }
    ]

export default licenze;