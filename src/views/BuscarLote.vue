<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title color="success">Buscar lote</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col size="12">
                    <ion-list>
                        <ion-item>
                            <ion-select placeholder="Seleccionar lote.." fill="outline" ok-text="ok" cancel-text="Cancelar" shape="round" @ionChange="listarRegistrosDeSiembra($event)">
                                <ion-select-option v-for="item in lotesSiembra" label-placement="floating" :value="item.idRegistroSiembra" :selected-text="item.idRegistroSiembra">{{ item.loteRegistroSiembra }}</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-list>
                </ion-col>
                <ion-col size="12">
                    <ion-card color="success" elevation="1">
                        <!-- <ion-card-header>
                            <ion-card-title>
                                RESUMEN LOTE
                            </ion-card-title>
                        </ion-card-header> -->
                        <ion-item>
                            <ion-label>%Germinación : </ion-label>
                            <ion-chip label color="success">{{plantasActivas}}</ion-chip>
                            <ion-chip label color="success">{{plantasInactivas}}</ion-chip>
                            <ion-chip label color="success" v-if="plantasActivas == 0 && plantasInactivas == 0">0</ion-chip>
                            <ion-chip label color="success" v-else>{{((((plantasInactivas/ plantasActivas)* 100).toFixed(2))-100) *(-1)}}%</ion-chip>
                        </ion-item>
                        <ion-item>
                            <ion-label>Clasificación A : </ion-label>
                            <ion-chip label color="success">{{ (valorTipoA).toFixed(2) }} Kg</ion-chip>
                        </ion-item>
                        <ion-item>
                            <ion-label>Clasificación B : </ion-label>
                            <ion-chip label color="success">{{ (valorTipoB).toFixed(2) }} Kg</ion-chip>
                        </ion-item>
                        <ion-item>
                            <ion-label>Clasificación C : </ion-label>
                            <ion-chip label color="success">{{ (valorTipoC).toFixed(2) }} Kg</ion-chip>
                        </ion-item>
                        <ion-item>
                            <ion-label>Clasificación D : </ion-label>
                            <ion-chip label color="success">{{ (valorTipoD).toFixed(2) }} Kg</ion-chip>
                        </ion-item>
                    </ion-card>
                </ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
</ion-page>
</template>

<script>
import axios from 'axios'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    toastController,
    IonButton,
    IonIcon,
    IonChip,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonInput,

} from '@ionic/vue';
export default {
    name: 'CannandesAppBuscarLote',

    data() {
        return {
            lotesSiembra: [],
            plantasActivas: '',
            plantasInactivas: '',
            valorTipoA: 0,
            valorTipoB: 0,
            valorTipoC: 0,
            valorTipoD: 0,
        };
    },

    mounted() {
        this.listarLotesSiembra()
    },

    methods: {

        listarProduccionLote(idRegistro) {
            try {
                this.inicializarVariables()
                axios.get('http://localhost:6060/api/tucann/posRegistroProduccion/proxlote/' + idRegistro)
                    .then(res => {
                      
                        for (let index = 0; index < res.data.length; index++) {

                            this.valorTipoA += res.data[index].valorRegistroProduccionClasifA
                            this.valorTipoB += res.data[index].valorRegistroProduccionClasifB
                            this.valorTipoC += res.data[index].valorRegistroProduccionClasifC
                            this.valorTipoD += res.data[index].valorRegistroProduccionClasifD

                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            }

        },

        inicializarVariables() {

            this.valorTipoA = 0
            this.valorTipoB = 0
            this.valorTipoC = 0
            this.valorTipoD = 0
        },

        listarRegistrosDeSiembra(idRegistro) {

            this.listarProduccionLote(idRegistro.detail.value)

            axios.get('http://localhost:6060/api/tucann/proRegistroSiembra/bplxidtrsandes/' + idRegistro.detail.value + '/' + 1)
                .then(res => {
                    this.plantasActivas = res.data.length
                })
                .catch(err => {
                    console.error(err);
                })

            axios.get('http://localhost:6060/api/tucann/proRegistroSiembra/bplxidtrsandes/' + idRegistro.detail.value + '/' + 3)
                .then(res => {
                    this.plantasInactivas = res.data.length
                })
                .catch(err => {
                    console.error(err);
                })
        },
        listarLotesSiembra() {
            try {
                this.lotesSiembra = [];
                axios.get('http://localhost:6060/api/tucann/proRegistroSiembra')
                    .then(res => {
                        this.lotesSiembra = res.data
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {

            }

        },
        async traerLote(idLote) {
          //  console.log(idLote.detail.value)
            // await axios.get('http://localhost:6060/api/tucann/proRegistroSiembra/' + idLote.detail.value)
            //     .then(res => {
            //         // this.loteMostrar = res.data.loteRegistroSiembra
            //         //  this.traerPlantasLote(res.data.loteRegistroSiembra)
            //         // console.log(res.data.loteRegistroSiembra)
            //     })
            //     .catch(err => {
            //         console.error(err);
            //     })
        },

    },
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonList,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonLabel,
        IonButton,
        IonIcon,
        IonChip,
        IonCard,
        IonCardTitle,
        IonCardHeader,
        IonInput,
    },
};
</script>
