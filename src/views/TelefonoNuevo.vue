<template>
<ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Inventario</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-grid>
            <ion-row>
                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="ID" disabled="true" v-model="id"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="NOMBRE TELEFONO" v-model="phone.name"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="AÑO" type="number" v-model="phone.data.year"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="modelosa" v-model="phone.data['CPU model']"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="Capacidad de memoria" v-model="phone.data['Hard disk size']"></ion-input>
                </ion-col>
                <ion-col size="12">
                    <ion-input label-placement="stacked" fill="outline" shape="round" color="success" label="Precio" v-model="phone.data.price"></ion-input>
                </ion-col>
                <ion-col size="4">
                    <ion-button shape="round" color="primary" expand="full" @click="agregarTelefono()"> Agregar</ion-button>
                </ion-col>
                <ion-col size="4">
                    <ion-button shape="round" color="success" expand="full" @click="editarTelefono()"> Editar</ion-button>
                </ion-col>
                <ion-col size="4">
                    <ion-button shape="round" color="danger" expand="full" @click="eliminarTelefono()"> Eliminar</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
        <ion-toast :icon="informationOutline" :message="toastMensaje" :duration="3000" :isOpen="errorState" @didDismiss=mostrarToast(false)></ion-toast>
    </ion-content>
</ion-page>
</template>

<script>
import axios from 'axios'
import {
    informationOutline
} from 'ionicons/icons'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonToast

} from '@ionic/vue';
export default {
    name: 'TelefonoNuevo',

    data() {
        return {
            errorState: false,
            toastMensaje: '',
            informationOutline,
            id: 0,
            phone: {
                "name": "Apple iPhone 11, 64GB",
                "data": {
                    "year": 2019,
                    "price": 389.99,
                    "CPU model": '"Intel Core i9"',
                    "Hard disk size": '1 TB'
                }
            }

        };
    },

    mounted() {

    },

    methods: {
        mostrarToast(estado, mensaje) {
            this.toastMensaje = mensaje
            this.errorState = estado
        },

        eliminarTelefono() {
            if (this.id != 0) {
                axios.delete(`https://api.restful-api.dev/objects/${this.id}`)
                    .then(res => {
                        console.log(res.data)
                        this.id = 0
                        this.mostrarToast(true, "Eliminado correctamante!")
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } else {
                this.mostrarToast(true, "Id de telefono no existe!")
            }
        },

        editarTelefono() {
            if (this.id != 0) {

                axios.put(`https://api.restful-api.dev/objects/${this.id}`, this.phone)
                    .then(res => {
                        console.log(res.data)
                        this.mostrarToast(true, "Actualizado")
                    })
                    .catch(err => {
                        console.error(err);
                    })
            } else {
                this.mostrarToast(true, "El Id de telefono no existe")
            }
        },

        agregarTelefono() {
            axios.post('https://api.restful-api.dev/objects', this.phone)
                .then(res => {
                    console.log(res.data)
                    this.id = res.data.id
                    this.mostrarToast(true, 'Agregado correctamente')
                })
                .catch(err => {
                    console.error(err);
                })

        },

        nuevoTelefono() {

            let phone = {

                "name": "Apple iPhone 11, 64GB",
                "data": {
                    "year": '',
                    "price": 389.99,
                    "CPU model": '',
                    "Hard disk size": ''
                }
            }
            axios.post('https://api.restful-api.dev/objects', phone)
                .then(res => {
                    console.log(res)
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
        IonGrid,
        IonRow,
        IonCol,
        IonInput,
        IonButton,
        IonToast
    }
};
</script>
