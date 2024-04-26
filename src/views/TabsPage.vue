<template>
<ion-page>
    <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar>

            <ion-tab-button tab="buscarplanta" href="/tabs/buscarplanta">
                <ion-icon aria-hidden="true"  :icon="flowerOutline"></ion-icon>
                <ion-label>Buscar Planta</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="registrocrecimiento" href="/tabs/registrocrecimiento">
                <ion-icon aria-hidden="true" :icon="readerOutline"></ion-icon>
                <ion-label>Registro crecimiento</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="buscarlote" href="/tabs/buscarlote">
                <ion-icon aria-hidden="true" :icon="gridOutline"></ion-icon>
                <ion-label>Buscar Lote</ion-label>
            </ion-tab-button>
<!-- 
            <ion-tab-button tab="telefononuevo" href="/tabs/telefononuevo">
                <ion-icon aria-hidden="true" :icon="gridOutline"></ion-icon>
                <ion-label>Buscar Lote</ion-label>
            </ion-tab-button> -->

        </ion-tab-bar>
    </ion-tabs>
    <!-- <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content> -->
</ion-page>
</template>

<script>
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
} from '@ionic/vue';
import {
    menuOutline,
    //serverSharp,
    flowerOutline,
    gridOutline,
    optionsOutline,
    readerOutline,

} from 'ionicons/icons'
export default {
    name: 'TestAxiosTabsPage',

    data() {
        return {
            name: 'TabsPage',
            menuOutline,
            //serverSharp,
            flowerOutline,
            gridOutline,
            optionsOutline,
            readerOutline
        };
    },

    mounted() {

    },

    methods: {

    },
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonPage,
        IonTabs,
        IonRouterOutlet,
        IonTabBar,
        IonTabButton,
        IonIcon,
        IonLabel,
    },
};
</script>

<style scoped>
/* #container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
} */
</style>
