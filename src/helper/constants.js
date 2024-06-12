export const device_type = {
    "aati_fa": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["load_storage", 30],
                ["tray_out", 30],
                ["run_method", 4800]
            ]
        }
    },

    "adx": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["scan_plate", 60],
                ["dispense_plate", 30],
                ["prime_lines", 5],
                ["move_to_safe", 5],
                ["", 10]
            ]
        },
        "estimator_class": "gos.execution.devices:ADXEstimator"
    },

    "atc": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["open_door", 30],
                ["close_door", 20],
                ["dts_lpv2_pcr_auto", 7200],
                ["fx_nebv2_pcr_auto", 25200],
                ["ips_pcr_auto", 3600],
                ["ips_pcr_v2_auto", 3600],
                ["dts_index_pcr_auto", 3600],
                ["", 3600]
            ]
        },
        "urgent_methods": ["close_door"]
    },

    "atc_96": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["open_door", 30],
                ["close_door", 20],
                ["dts_capture_incubation_auto", 14700],
                ["dts_post_capture_pcr_auto", 2360],
                ["set_idle_block_temperature", 5],
                ["set_idle_cover_temperature", 5],
                ["post_run_wait_for_user", 60]
            ]
        },
        "urgent_methods": ["close_door"]
    },

    "biomek": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["lpv3_part1", 838],
                ["lpv3_part2", 13400],
                ["load_labware", 20],
                ["unload_labware", 20],
                ["clear_deck", 1],
                ["lpv4_part1", 838],
                ["lpv4_part2", 13400],
                ["", 1]
            ]
        },
        "estimator_class": "gos.execution.devices:BiomekEstimator"
    },

    "bioshake": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["shake_variable_speed", 131],
                ["shake_constant_speed", 131],
                ["temperature_on", 20],
                ["wait_for_temperature", 20],
                ["force_unlock", 5],
                ["", 1]
            ]
        },
        "estimator_class": "gos.execution.devices:BioshakeEstimator"
    },

    "cfx384": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["openlid", 15],
                ["closelid", 15],
                ["test-read", 240],
                ["dts_lpv2_pcr_auto", 4800],
                ["p_fxv2_neb_auto", 11760],
                ["ips_pcr_auto", 3600]
            ],
            "urgent_methods": ["closelid"]
        }
    },

    "delidder": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["hold", 4],
                ["release", 10]
            ],
            "urgent_methods": ["release"]
        }
    },

    "deplater": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 5}
    },

    "extr_loader": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 7}
    },

    "genera": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 500}
    },

    "labeler": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 10}
    },

    "m200": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["open_tray", 10],
                ["close_tray", 10],
                ["dts_pcr_quant", 275],
                ["dts_consolidation_quant", 60],
                ["gdna_picov2_quant", 475],
                ["gdna_absorbance_quant", 660],
                ["dts_index_pcr_cleanup_quant", 275],
                ["", 1]
            ],
            "urgent_methods": ["close_tray"]
        }
    },

    "microserve": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 30}
    },

    "mover": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 19}
    },

    "mtc": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 5}
    },

    "plateloc": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": 15,
            "urgent_methods": ["seal_plate"]
        }
    },

    "platescanner": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 9}
    },

    "slide": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 10}
    },

    "sonicman": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["open_door", 10],
                ["close_door", 13],
                ["dts_fragmentation", 1385],
                ["custom_sonication", 1385],
                ["enable_chiller", 300],
                ["disable_chiller", 5],
                ["set_circulator_params", 5]
            ],
            "urgent_methods": [
                "close_door",
                "enable_chiller",
                "set_circulator_params"
            ]
        }
    },

    "steristore": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 23}
    },

    "t1": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["elutionv5", 440],
                ["elution", 540],
                ["picov2", 400],
                ["fxassaystampv3", 285],
                ["fxassaystamp", 735],
                ["faplateprep", 595],
                ["dtspcrassaystamp", 1000],
                ["dtspcrassaystampv2", 820],
                ["dtspcrassaystampv3", 400],
                ["ipspcrassaystampv3", 400],
                ["ipspcrassaystampv3novaseq", 400],
                ["barcodescandevicediagnostic", 30],
                ["move_plate", 35],
                ["setworktable", 5],
                ["runevowarescript", 20],
                ["dtsindexpcrstamp", 400],
                ["", 1]
            ]
        }
    },

    "t2": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["normv2", 1010],
                ["normalization", 1010],
                ["gdnabuildv2", 895],
                ["barcodescandevicediagnostic", 30],
                ["dtsgdnaplatebuild", 1500],
                ["", 1]
            ]
        }
    },

    "t100": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["tecan_gdna_batch_build", 1010],
                ["tecan_gdna_consolidation", 1010],
                ["cdx_batching", 1010],
                ["cdx_ngs_batching", 1010],
                ["ngs_batching", 1010],
                ["tecan_path_length_reduction", 300],
                ["tecan_normalization", 1010],
                ["gdnaplating", 895],
                ["barcodescandevicediagnostic", 30],
                ["service_tecan_test_gdna_consolidation", 1010],
                ["", 1]
            ]
        }
    },

    "t5": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["dtsbeadcleanup", 3230],
                ["dtsconsolidation192", 3600],
                ["dtsconsolidationv2", 4320],
                ["icsconsolidationv2", 4320],
                ["dtsindexpcrcleanup", 3180],
                ["dtsindexconsolidation", 1020],
                ["dtscaptureconsolidation", 5400],
                ["dtspostcapturepcrstamp", 360],
                ["dtspostcapturepcrcleanup", 2700],
                ["", 30]
            ]
        }
    },

    "t8-script": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["ipsplasmasepserumtransfer", 665],
                ["ipsplasmasepplasmatransfer", 235],
                ["ipsreextraction", 60],
                ["^.*IPS_EXTR_MJ_Stamp", 80],
                ["^.*CFE_v2_p1_LysisMix", 60],
                ["^.*CFE_v2_p2_BeadMix_OnChillers", 120],
                ["^.*CFE_v2_p3_BeadMix_OnMag", 90],
                ["^.*IPS_EXTR_Supernatant_Aspiration", 240],
                ["^.*IPS_EXTR_EtOH_High_Volume_Aspiration", 210],
                ["^.*IPS_EXTR_EtOH_Low_Volume_Aspiration", 150],
                ["^.*CFE_v2_p7_Dry_Aspiration", 45],
                ["^.*IPS_EXTR_Elution", 55],
                ["", 5]
            ]
        }
    },

    "tecan-mover": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["moveplateandcheck1dbarcode", 60],
                ["updateworktable", 5],
                ["", 30]
            ]
        },
        "urgent_methods": ["urgent_move_plate"]
    },

    "tubepicker": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["remove_plate", 5],
                ["place_plate", 5],
                ["move_tubes", 195],
                ["move", 5],
                ["vacuum_on", 5],
                ["vacuum_off", 5]
            ]
        },
        "estimator_class": "gos.execution.devices:TubePickerEstimator"
    },

    "vspin": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {
            "estimate": [
                ["open_door", 15],
                ["load_plate", 18],
                ["unload_plate", 17],
                ["spin_cycle", 90]
            ],
            "urgent_methods": ["open_door"]
        },
        "estimator_class": "gos.execution.devices:VSpinEstimator"
    },

    "xpeel": {
        "controller": "counsyl_autoapp_client.genapp:GenappClient",
        "estimator": {"estimate": 25}
    }
}

export const devices = [
  {
    "name": "sf2-preamp-a-bioshake-1",
    "url": "https://sf2prabska1.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-a-bioshake-2",
    "url": "https://sf2prabska2.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-a-bioshake-3",
    "url": "https://sf2prabska3.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-b-bioshake-1",
    "url": "https://sf2prbbska1.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-b-bioshake-2",
    "url": "https://sf2prbbska2.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-b-bioshake-3",
    "url": "https://sf2prbbska3.robo.counsyl.com",
    "type": "bioshake"
  },
  {
    "name": "sf2-preamp-a-delidder-1",
    "url": "https://sf2pradlda1.robo.counsyl.com",
    "type": "delidder"
  },
  {
    "name": "sf2-preamp-b-delidder-1",
    "url": "https://sf2prbdlda1.robo.counsyl.com",
    "type": "delidder"
  },
  {
    "name": "sf2-preamp-a-labeling-1",
    "url": "https://sf2pralbla1.robo.counsyl.com",
    "type": "labeler"
  },
  {
    "name": "sf2-preamp-b-labeling-1",
    "url": "https://sf2prblbla1.robo.counsyl.com",
    "type": "labeler"
  },
  {
    "name": "sf2-preamp-a-m200-1",
    "url": "https://sf2pram2ha1.robo.counsyl.com",
    "type": "m200"
  },
  {
    "name": "sf2-preamp-b-m200-1",
    "url": "https://sf2prbm2ha1.robo.counsyl.com",
    "type": "m200"
  },
  {
    "name": "sf2-preamp-a-microserve-1",
    "url": "https://sf2pramsva1.robo.counsyl.com",
    "type": "microserve"
  },
  {
    "name": "sf2-preamp-b-microserve-1",
    "url": "https://sf2prbmsva1.robo.counsyl.com",
    "type": "microserve"
  },
  {
    "name": "sf2-preamp-a-mover-1",
    "url": "https://sf2pramvra1.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-a-mover-2",
    "url": "https://sf2pramvra2.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-b-mover-1",
    "url": "https://sf2prbmvra1.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-b-mover-2",
    "url": "https://sf2prbmvra2.robo.counsyl.com",
    "type": "mover"
  },
  {
    "name": "sf2-preamp-a-plateloc-1",
    "url": "https://sf2praploa1.robo.counsyl.com",
    "type": "plateloc"
  },
  {
    "name": "sf2-preamp-b-plateloc-1",
    "url": "https://sf2prbploa1.robo.counsyl.com",
    "type": "plateloc"
  },
  {
    "name": "sf2-preamp-a-platescanner-1",
    "url": "https://sf2praztha1.robo.counsyl.com",
    "type": "platescanner"
  },
  {
    "name": "sf2-preamp-b-platescanner-1",
    "url": "https://sf2prbztha1.robo.counsyl.com",
    "type": "platescanner"
  },
  {
    "name": "sf2-preamp-a-slide-1",
    "url": "https://sf2praslda1.robo.counsyl.com",
    "type": "slide"
  },
  {
    "name": "sf2-preamp-a-slide-2",
    "url": "https://sf2praslda2.robo.counsyl.com",
    "type": "slide"
  },
  {
    "name": "sf2-preamp-a-steristore-1",
    "url": "https://sf2prassta1.robo.counsyl.com",
    "type": "steristore"
  },
  {
    "name": "sf2-preamp-b-steristore-1",
    "url": "https://sf2prbssta1.robo.counsyl.com",
    "type": "steristore"
  },
  {
    "name": "sf2-preamp-a-t1e",
    "url": "https://preamp-tecan-app-t1e.robo.counsyl.com",
    "type": "t1"
  },
  {
    "name": "sf2-preamp-a-t2e",
    "url": "https://preamp-tecan-app-t2e.robo.counsyl.com",
    "type": "t2"
  },
  {
    "name": "sf2-preamp-a-b1c",
    "url": "https://preamp-b1c-app.robo.counsyl.com",
    "type": "b1"
  },
  {
    "name": "sf2-preamp-a-tubepicker-1",
    "url": "https://sf2pratpka1.robo.counsyl.com",
    "type": "tubepicker"
  },
  {
    "name": "sf2-preamp-a-vspin-1",
    "url": "https://sf2pravspa1.robo.counsyl.com",
    "type": "vspin"
  },
  {
    "name": "sf2-preamp-b-vspin-1",
    "url": "https://sf2prbvspa1.robo.counsyl.com",
    "type": "vspin"
  },
  {
    "name": "sf2-preamp-a-xpeel-1",
    "url": "https://sf2praxpla1.robo.counsyl.com",
    "type": "xpeel"
  },
  {
    "name": "sf2-preamp-b-xpeel-1",
    "url": "https://sf2prbxpla1.robo.counsyl.com",
    "type": "xpeel"
  },
  {
    "name": "sf2-preamp-b-tubepicker-1",
    "url": "https://sf2prbtpka1.robo.counsyl.com",
    "type": "tubepicker"
  }
];
