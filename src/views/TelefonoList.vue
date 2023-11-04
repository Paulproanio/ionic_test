<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Lista Teléfonos </ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-list lines="full" v-for="phone in phones" :key="phone.id">
            <ion-item>
                <ion-icon :icon="checkmarkCircle" color="success" slot="start"> </ion-icon>
                <ion-label>{{ phone.name }}
                    <span v-if="phone.data && phone.data.hasOwnProperty('color')">({{ phone.data.color }})</span>
                </ion-label>
            </ion-item>

        </ion-list>
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
    IonList,
    IonItem,
    IonLabel,
    IonIcon,

} from '@ionic/vue';

import {
    checkmarkCircle
} from 'ionicons/icons'

export default {
    name: 'TelefonoList',

    data() {
        return {
            checkmarkCircle,
            phones: []

        };
    },

    mounted() {
        this.traerTelefonos()
    },

    methods: {

        traerTelefonos() {
            axios.get('https://api.restful-api.dev/objects')
                .then(res => {
                    this.phones = res.data
                    console.log(res.data)
                    
                })
                .catch(err => {
                    console.error(err);
                })
        }

    },
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
    }
};
</script>
