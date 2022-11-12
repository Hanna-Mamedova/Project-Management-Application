import { createAction } from '@ngrx/store';

export enum AppActionType {
  APP_LOADED = '[App] App Loaded',
}

export const appLoaded = createAction(AppActionType.APP_LOADED);
