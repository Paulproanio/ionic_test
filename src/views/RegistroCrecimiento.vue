<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title color="success">Registro crecimiento </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-grid>
            <ion-row>
                <ion-col size="12">
                    <ion-list>
                        <ion-item>
                            <ion-select placeholder="Seleccionar lote.." fill="outline" ok-text="ok" cancel-text="Cancelar" shape="round" @ionChange="traerLote($event)">
                                <ion-select-option v-for="item in lotesSiembra" label-placement="floating" :value="item.idRegistroSiembra" :selected-text="item.idRegistroSiembra">{{ item.loteRegistroSiembra }}</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-list>
                </ion-col>
                <ion-col size="12">
                    <ion-card color="success" elevation="1">
                        <!-- <ion-card-header>
                            <ion-card-title>Registrar medición</ion-card-title>
                        </ion-card-header> -->
                        <ion-content>
                            <ion-chip></ion-chip>
                        </ion-content>
                        <ion-list>
                            <ion-item>
                                <ion-label>Lote : </ion-label>
                                <ion-chip color="success">{{ loteMostrar }}</ion-chip>
                            </ion-item>
                            <ion-item>
                                <ion-label>N° Plantas : </ion-label>
                                <ion-chip color="success">{{ numeroPlantasCreciMasivo }}</ion-chip>
                            </ion-item>
                            <ion-item>
                                <ion-input type="number" color="success" label="Medición :" v-model="valorRegistroCrecimiento"></ion-input>
                            </ion-item>
                        </ion-list>
                    </ion-card>
                </ion-col>
                <ion-col size="3"></ion-col>
                <ion-col size="3">
                    <ion-button shape="round" color="success" expand="full" @click="registrarCrecimiento(valorRegistroCrecimiento)">
                        <ion-icon :icon="save"></ion-icon>
                    </ion-button>
                </ion-col>
                <ion-col size="3">
                    <ion-button shape="round" color="danger" expand="full" @click="inicializarVariablesSiembra()">

                        <ion-icon :icon="closeOutline"></ion-icon>
                    </ion-button>
                </ion-col>
                <ion-col size="3"></ion-col>

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
import {
    search,
    save,
    closeOutline
} from 'ionicons/icons'
export default {
    name: 'CannandesAppGestionarCrecimiento',

    data() {
        return {
            search,
            save,
            closeOutline,
            loteSeleccionado: '',
            valorRegistroCrecimiento: '',
            numeroPlantasCreciMasivo: '',
            lotesSiembra: [],
            loteMostrar: '',
            identPlantasCrecmiento: [],

        };
    },

    mounted() {
        this.listarLotesSiembra()
    },

    methods: {

        async registrarCrecimiento(valorRegistroCrecimiento) {

            if (valorRegistroCrecimiento == 0 || valorRegistroCrecimiento == '') {
                alert("Valor no permitido !!")

            } else {
                try {
                    for (let index = 0; index < this.identPlantasCrecmiento.length; index++) {

                        let json = {
                            idRegistro: '',
                            valorRegistro: parseInt(valorRegistroCrecimiento),
                            fechaRegistro: '',
                            semanaRegistro: this.semanaDelAnioEnCurso(new Date()),
                            proPlanta: {
                                idPlanta: this.identPlantasCrecmiento[index],
                            }
                        }
                        await axios.post('http://localhost:12590/api/tucann/proRegistroCrecimiento/', json)
                            .then(res => {})
                            .catch(err => {
                                console.error(err);
                            })
                    }
                } catch (error) {

                } finally {
                    this.mensajeGuardadoCorrecto()
                    this.inicializarVariablesSiembra()
                }
            }
        },

        inicializarVariablesSiembra() {
            this.identPlantasCrecmiento = []
            this.loteMostrar = ''
            this.numeroPlantasCreciMasivo = ''
            this.valorRegistroCrecimiento = ''
            this.loteRegistroSiembra = ''
        },

        semanaDelAnioEnCurso(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            var dayNum = d.getUTCDay() + 1 || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        },

        async traerPlantasLote(idLote) {

            this.identPlantasCrecmiento = [];
            await axios.get('http://localhost:12590/api/tucann/proPlanta/bplxrs/' + idLote)
                .then(res => {
                    this.numeroPlantasCreciMasivo = res.data.length;
                    for (let index = 0; index < res.data.length; index++) {
                        this.identPlantasCrecmiento.push(res.data[index].idPlanta);

                    }

                })
                .catch(err => {
                    console.error(err);
                })
        },

        async traerLote(idLote) {

            await axios.get('http://localhost:12590/api/tucann/proRegistroSiembra/' + idLote.detail.value)
                .then(res => {
                    this.loteMostrar = res.data.loteRegistroSiembra
                    this.traerPlantasLote(res.data.loteRegistroSiembra)
                    // console.log(res.data.loteRegistroSiembra)
                })
                .catch(err => {
                    console.error(err);
                })
        },

        handleChange(ev) {
            // console.log('ionChange fired with value: ' + ev.detail.value);
            this.hola(ev.detail.value)

        },
        async mensajeGuardadoCorrecto() {
            const toast = await toastController.create({
                message: "Registro crecimiento guardado !!",
                duration: 2000,
                color: 'success',
            });
            toast.present();
        },

        listarLotesSiembra() {
            try {
                this.lotesSiembra = [];
                axios.get('http://localhost:12590/api/tucann/proRegistroSiembra')
                    .then(res => {

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
