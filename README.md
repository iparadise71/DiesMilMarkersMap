DiesMilMarkersMap
![Screenshot](example.png)
angular 7.0.4

    | Scaffold  | Usage                           |
    | :-------: | :-----------------------------: |
    | Component | ng g component my-new-component |
    | Directive | ng g directive my-new-directive |
    | Pipe      | ng g pipe my-new-pipe           |
    | Service   | ng g service my-new-service     |
    | Class     | ng g class my-new-class         |
    | Guard     | ng g guard my-new-guard         |
    | Interface | ng g interface my-new-interface |
    | Enum      | ng g enum my-new-enum           |
    | Module    | ng g module my-module           |

**`Dependencias`**
    ---------------------------------------------
    
- AGM MAPS

    https://angular-maps.com/api-docs/agm-core/
    
    npm install @agm/core
    
        @NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                AgmCoreModule.forRoot({
                    apiKey: 'asAdsaglijkjlkh6dfsdfsdf65466ASSdsfMMCIKDNcmxcvxjj7'
                }),
            ],

    
- @types/googlemaps
    
    https://www.npmjs.com/package/@types/googlemaps
    
    npm install --save @types/googlemaps

- TEMPLATE

    http://aozora.github.io/bootplus/getting-started.html
