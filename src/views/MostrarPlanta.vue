<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-buttons>
                <ion-back-button>
                </ion-back-button>
            </ion-buttons>
            <ion-title>Buscar
            </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-card color="success" elevation="1">
            <ion-card-header>

                <ion-card-title > FICHA TÉCNICA PLANTA

                    <ion-chip v-if="elementosPlanta.proEstadoPlanta.idEstadoPlanta == 1 ">
                        <ion-avatar>
                            <ion-icon :icon="checkmarkCircle"></ion-icon>
                        </ion-avatar>
                        <ion-label> {{ elementosPlanta.proEstadoPlanta.nombreEstadoPlanta }}</ion-label>
                    </ion-chip>
                    <ion-chip v-else>
                        <ion-avatar>
                            <ion-icon :icon="checkmarkCircle"></ion-icon>
                        </ion-avatar>
                        <ion-label> {{ elementosPlanta.proEstadoPlanta.nombreEstadoPlanta }}</ion-label>
                    </ion-chip>

                    <!--    <ion-chip>
                        <ion-icon :icon="leafSharp"></ion-icon>
                        <ion-text>
                            ID: <h6> {{ }}</h6>
                        </ion-text>
                    </ion-chip> -->

                </ion-card-title>

                <ion-card-subtitle>CARACTERÍSTICAS PRINCIPALES</ion-card-subtitle>

                <ion-grid>
                    <ion-icon :icon="leafSharp"></ion-icon>
                    <ion-row>
                        <!-- <ion-col>{{ elementosPlanta.proEstadoPlanta.nombreEstadoPlanta }}</ion-col> -->
                        <ion-col>{{ elementosPlanta.idPlanta }}</ion-col>

                    </ion-row>
                </ion-grid>

                <ion-item>

                </ion-item>

            </ion-card-header>
        </ion-card>
    </ion-content>
</ion-page>
</template>

<script>
import axios from 'axios'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    IonCardContent,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonAlert,
    IonToast,
    IonChip,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,

} from '@ionic/vue'
import {
    leafSharp,
    checkmarkSharp,
    checkmarkCircle
} from 'ionicons/icons'

export default {
    name: 'CannandesAppMostrarPlanta',

    data() {
        return {
            leafSharp,
            checkmarkSharp,
            checkmarkCircle,
            
            elementosPlanta: [{
                clasificacionA: 0,
                clasificacionB: 0,
                clasificacionC: 0,
                clasificacionD: 0,
                codigoQR: "9f17ff54-b803-40aa-9d64-e2cec293fe3d",
                idPlanta: 1,
                lotePlanta: "",
                numeroBandeja: "1",
                porcentajeCbdPlanta: 0,
                porcentajeThcPlanta: 0,
                prefijoPlanta: "AAA",
                proEstadoPlanta: {
                    idEstadoPlanta: 1,
                    nombreEstadoPlanta: 'Activa',
                    detalleEstadoPlanta: 'Semilla que si germinó y sigue en el proceso de producción',
                    proGestionarEstadoPlanta: null
                },
                proPlanta: null,
                proRegistroSiembra: {
                    idRegistroSiembra: 1,
                    loteRegistroSiembra: 'C112122501',
                    semanaRegistroSiembra: '22',
                    pesoImpuresasRegistroSiembra: null,
                    pesoSemillasRegistroSiembra: 0.022,

                },
                proTipoPlanta: {
                    idTipoPlanta: 2,
                    nombreTipoPlanta: 'Madre',
                    detalleTipoPlanta: 'Planta madre usada para clonación'
                },
                proUbicacion: {
                    idUbicacion: '0-0-0',
                    ubiPrimeraParte: 0,
                }
            }]
        };
    },
    

    mounted() {

        // this.buscarPlanta(this.$route.params.idPlanta)
        this.buscarPlanta(1)

    },

    methods: {

        async buscarPlanta(codigoPlanta) {
            await axios.get('http://localhost:6060/api/tucann/proPlanta/' + codigoPlanta)
                .then(res => {
                    console.log(res.data)
                    this.elementosPlanta = res.data

                })
                .catch(err => {
                    console.error(err);
                })
        },

    },
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonList,
        IonCardContent,
        IonItem,
        IonThumbnail,
        IonLabel,
        IonButton,
        IonIcon,
        IonAlert,
        IonToast,
        IonChip,
        IonText,
        IonGrid,
        IonRow,
        IonCol,
        IonAvatar,
    },
};
</script>

<style>
ion-chip {
    --background: #00213f;
    --color: #adefd1;
}
</style>
