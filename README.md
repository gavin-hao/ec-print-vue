# ec-print-vue
ec-print vue3 plugin

# Usage

```BASH
#bash

yarn install ec-print ec-print-vue

```

```typescript
// printer.ts

import { createPrinter } from './plugin';
// type CreateOptions={
//   providers: Array<{
//     key?: string;
//     providerFactory: DerivedProvider | (() => PrintProvider);
//     socketOption?: SocketOption;
//   }>;
//   socketOption?: SocketOption;
//   }
const printer = createPrinter({
  providers: [],//providers factory like  [{ key:'cainiao',providerFactory:()=>new Providers.Cainiao({})}]
  socketOption: {
    autoReconnect: true,
    maxRetries: 2,
    debug: true,
  },
});
printer.instance.connect();

export default printer;

```
``` typescript
// main.ts

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import printer from './printer';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
// use printer plugin
app.use(printer);
app.mount('#app');

```
```typescript
// printer.vue 
// setup script

const printer = usePrinter();
const printerConnect = usePrinterConnectStatus();
const handlePrint = async () => {
  const task={
    // printTask Object
    // _agentKey:'cainiao'
    // ...
  }
  const res = await printer.print(task, 'cainiao');
}

// get printers
onMounted(() => {
  setTimeout(() => {
    printer.getPrinters().then((res) => {
      printers.value = res.printers?.map((p) => p.name || '');
    });
  }, 10000);

  connectings.value = printer.isConnect;
});

```
- details about ec-print  see [ec-print](https://github.com/gavin-hao/ec-print)


