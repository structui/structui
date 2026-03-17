import { accordionComponent } from "./accordion";
import { badgeComponent } from "./badge";
import { buttonComponent } from "./button";
import { catalogComponents } from "./catalog";

export const componentRegistryEntries = [
  buttonComponent,
  badgeComponent,
  accordionComponent,
  ...catalogComponents,
];
