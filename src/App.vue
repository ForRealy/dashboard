<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-title>Dashboard Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-menu-toggle auto-hide="false">
              <ion-item router-link="/technical" router-direction="root" router-link-active="selected">
                <ion-icon slot="start" :icon="analyticsOutline"></ion-icon>
                <ion-label>Technical Dashboard</ion-label>
              </ion-item>
              <ion-item router-link="/business" router-direction="root" router-link-active="selected">
                <ion-icon slot="start" :icon="trendingUpOutline"></ion-icon>
                <ion-label>Business Dashboard</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { 
  IonApp, 
  IonContent, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonMenu, 
  IonMenuToggle, 
  IonRouterOutlet, 
  IonSplitPane, 
  IonHeader, 
  IonToolbar, 
  IonTitle 
} from '@ionic/vue';
import { analyticsOutline, trendingUpOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane,
    IonHeader,
    IonToolbar,
    IonTitle
  },
  setup() {
    return {
      analyticsOutline,
      trendingUpOutline
    };
  }
});
</script>

<style>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu ion-toolbar {
  --background: var(--ion-toolbar-background, var(--ion-color-primary, #3880ff));
  --color: var(--ion-toolbar-color, var(--ion-color-primary-contrast, #fff));
}

ion-menu ion-list {
  padding: 20px 0;
}

ion-menu ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  border-radius: 4px;
  margin: 0 16px;
}

ion-menu ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu ion-item ion-icon {
  color: #616e7e;
  margin-right: 16px;
}

ion-menu ion-item ion-label {
  font-weight: 500;
}
</style>
