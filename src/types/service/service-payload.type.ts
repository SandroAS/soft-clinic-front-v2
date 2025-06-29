import type { SystemModule } from '../systemModule/system-module.type';

export default interface ServicePayload {
  uuid?: string;
  name: string;
  description?: string;
  price: string;
  systemModule?: SystemModule;
}
