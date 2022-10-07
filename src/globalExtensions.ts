import Printer from 'ec-print';
import { PrinterStatus } from './plugin';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $printer: Printer;
    $printer_connect_status: PrinterStatus;
  }
}
