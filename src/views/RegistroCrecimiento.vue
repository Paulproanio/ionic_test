<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Registro crecimiento </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col size="12">
                    <ion-list>
                        <ion-item>
                            <ion-select placeholder="Seleccionar lote.." fill="outline" ok-text="ok" cancel-text="Cancelar" shape="round" :selected-text="item.idRegistroSiembra">
                                <ion-select-option :value="item.idRegistroSiembra" v-for="item in lotesSiembra" label-placement="floating" @ion-change="seleccionarLote(item)" >{{ item.loteRegistroSiembra }}</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-list>
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

} from '@ionic/vue';
export default {
    name: 'CannandesAppGestionarCrecimiento',

    data() {
        return {
            lotesSiembra: []

        };
    },

    mounted() {
        this.listarLotesSiembra()
    },

    methods: {

      seleccionarLote(a){
        console.log(a)
      },

        listarLotesSiembra() {
            try {
                this.lotesSiembra = [];
                axios.get('http://localhost:12590/api/tucann/proRegistroSiembra')
                    .then(res => {
                      console.log(res.data)
                        this.lotesSiembra = res.data
                        // for (let index = 0; index < res.data.length; index++) {
                        //     if (res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra == 2) {
                        //         //console.log(res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra);
                        //         this.lotesSiembra.push(res.data[index].loteRegistroSiembra);
                        //     }
                        // }
                        // console.log(this.lotesSiembra)
                    })
                    .catch(err => {
                        console.error(err);
                    })

                // axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/', {
                //         headers: generalHeader()
                //     })
                //     .then(res => {
                //         // console.log(res.data.length);
                //         for (let index = 0; index < res.data.length; index++) {
                //             if (res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra == 2) {
                //                 //  console.log(res.data[index].proEstadoRegistroSiembra.idEstadoRegistroSiembra);
                //                 this.lotesSiembra.push(res.data[index].loteRegistroSiembra);
                //             }
                //         }
                //     })
                //     .catch(err => {
                //         console.error(err);
                //     })
            } catch (error) {

            }

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
    },
};
</script>
