# [1.9.0](https://github.com/letanure/react-mobx-starter/compare/v1.8.1...v1.9.0) (2025-08-07)


### Features

* add Vercel deployment configuration and live demo link ([bdf977f](https://github.com/letanure/react-mobx-starter/commit/bdf977f06705e343256cb619fbc67742d3df9cd9))

## [1.8.1](https://github.com/letanure/react-mobx-starter/compare/v1.8.0...v1.8.1) (2025-08-07)


### Bug Fixes

* prevent cache failures from breaking workflows ([491f657](https://github.com/letanure/react-mobx-starter/commit/491f65760b52542ab271c333ec6cb7d5c9cc92f1))
* temporarily skip E2E tests in CI ([540a7f8](https://github.com/letanure/react-mobx-starter/commit/540a7f8e8d09a89773b2625947d7c0cf64080903))

# [1.8.0](https://github.com/letanure/react-mobx-starter/compare/v1.7.1...v1.8.0) (2025-08-07)


### Bug Fixes

* add missing build step to snapshot update workflow ([d628d9a](https://github.com/letanure/react-mobx-starter/commit/d628d9afb3d28b0850e92b7d87f9606bb4b71b48))


### Features

* optimize Playwright setup with shared reusable action ([8abd7c1](https://github.com/letanure/react-mobx-starter/commit/8abd7c1ddecd00714ae25fe84ad61c35f18123ec))

## [1.7.1](https://github.com/letanure/react-mobx-starter/compare/v1.7.0...v1.7.1) (2025-08-07)


### Bug Fixes

* ensure build artifacts available for E2E tests in CI ([1b7141d](https://github.com/letanure/react-mobx-starter/commit/1b7141d8dc9c7ecf89810c5c70480af2ccf3bc8a))

# [1.7.0](https://github.com/letanure/react-mobx-starter/compare/v1.6.0...v1.7.0) (2025-08-07)


### Features

* add manual E2E snapshot update workflow ([785e2b3](https://github.com/letanure/react-mobx-starter/commit/785e2b3e7d0167a230a8c9dec4f7ed4e9a100cc5))

# [1.6.0](https://github.com/letanure/react-mobx-starter/compare/v1.5.0...v1.6.0) (2025-08-07)


### Bug Fixes

* correct Playwright report path in CI workflow ([d566860](https://github.com/letanure/react-mobx-starter/commit/d56686023ec414b71d656c4765f839a18d89a2ed))


### Features

* complete GitHub Actions optimization phases 3-4 ([c17f2dc](https://github.com/letanure/react-mobx-starter/commit/c17f2dc49425ca2a4c715f43fe6414ea518ebd7c))

# [1.5.0](https://github.com/letanure/react-mobx-starter/compare/v1.4.0...v1.5.0) (2025-08-07)


### Features

* optimize GitHub Actions workflow with phases 1-2 ([94f6019](https://github.com/letanure/react-mobx-starter/commit/94f6019b71676996d08c58ff05642e652d5d6cd2))

# [1.4.0](https://github.com/letanure/react-mobx-starter/compare/v1.3.0...v1.4.0) (2025-08-07)


### Bug Fixes

* add required args with tag prop to Text stories with render functions ([dbcd5d7](https://github.com/letanure/react-mobx-starter/commit/dbcd5d7640a35f138f04cc9844e7397082b8ba82))
* add required resetLabel prop to FormBuilder ([7bed6ee](https://github.com/letanure/react-mobx-starter/commit/7bed6ee8c85c988cc5f3bd1d841931da7055a352))
* apply biome linting fixes and fix test setup ([327480d](https://github.com/letanure/react-mobx-starter/commit/327480d3aecd4445241ddfbd00c706c3b7c82e09))
* correct E2E test navigation and element selectors ([37ba154](https://github.com/letanure/react-mobx-starter/commit/37ba15444a94cd0733baef4a6c79d0b1350c27f2))
* correct FormBuilder usage in UserFormContent ([d5606d0](https://github.com/letanure/react-mobx-starter/commit/d5606d0bcb0e7af49c44203715dbad6f8586d7ce))
* format biome.json with proper negation syntax ([519ea6d](https://github.com/letanure/react-mobx-starter/commit/519ea6df9da771062bafdaf56ff16a6c33206558))
* implement proper validation error messages and controlled form inputs ([6a4cae7](https://github.com/letanure/react-mobx-starter/commit/6a4cae78752f945e91954bd8bf0afbd8b3a2e699))
* move and update button stories file ([a8fc442](https://github.com/letanure/react-mobx-starter/commit/a8fc442a639dbe3ba5c94108ada46ebffbd39b0d))
* properly ignore mockServiceWorker.js in biome config ([eab7140](https://github.com/letanure/react-mobx-starter/commit/eab7140d086d0e9b2dd7ccbff134a5d06fd1bf46))
* remove markdown files from Biome lint-staged config ([2d50f50](https://github.com/letanure/react-mobx-starter/commit/2d50f508479290bbba78eb9ce035e26532e4d667))
* remove unused args from Text stories with custom render functions ([fa44382](https://github.com/letanure/react-mobx-starter/commit/fa4438258ba8e86f0a7a5b5d46f22172e4a446fd))
* rename Button.tsx to button.tsx for consistent casing ([0b4f3be](https://github.com/letanure/react-mobx-starter/commit/0b4f3be36f1f8310b44bbc56ac5c34a33e07819c))
* reset version to 1.3.0 for proper semantic release ([4492994](https://github.com/letanure/react-mobx-starter/commit/4492994c5a34d7ca09046cef19e2161a2ffa1763))
* resolve all linting and accessibility issues - zero errors ([0b50b69](https://github.com/letanure/react-mobx-starter/commit/0b50b69b20ce86ae84346a685c2046668748505b))
* resolve all TypeScript build errors ([54a805d](https://github.com/letanure/react-mobx-starter/commit/54a805d05d113cbd90c648c79ea1aee3cf532048))
* resolve FormBuilder circular import by renaming main component file ([0479b61](https://github.com/letanure/react-mobx-starter/commit/0479b61a5b1b421a58688f234cc9d2e892d72012))
* resolve FormBuilder component type errors ([e4515e9](https://github.com/letanure/react-mobx-starter/commit/e4515e983ff13bf20ade48d839ca9a775d52df67))
* resolve linting issues and ignore mockServiceWorker.js ([bf94d85](https://github.com/letanure/react-mobx-starter/commit/bf94d85bfbe7b8a30ff194e9272088bd0e4d0b06))
* resolve RootStore type assertion for object parameter ([c6c4fca](https://github.com/letanure/react-mobx-starter/commit/c6c4fca2b698f0d6cf5dfe442ea9e7d6f392cb67))
* resolve TypeScript build errors in FormBuilder components ([7c78864](https://github.com/letanure/react-mobx-starter/commit/7c78864bf8c96fc94018f1824924fae954056a7e))
* resolve TypeScript errors for push ([cfc9bd2](https://github.com/letanure/react-mobx-starter/commit/cfc9bd2f10a2f2746bd50f49d9f621a9e98a0a63))
* resolve TypeScript errors in Text and Divider components ([d29ed2e](https://github.com/letanure/react-mobx-starter/commit/d29ed2ea93acc334256ba445801c40288c30f55d))
* simplify and align path aliases between vite and tsconfig ([20dc47d](https://github.com/letanure/react-mobx-starter/commit/20dc47d04b7f5c2bda635aae5337b22b68b2cf7f))
* trigger CI with proper E2E snapshots ([d38880c](https://github.com/letanure/react-mobx-starter/commit/d38880c407094a5c1ec78996f9fada73edef754f))
* update 'as' prop type in BoxProps to React.ElementType for better flexibility ([6b1155f](https://github.com/letanure/react-mobx-starter/commit/6b1155f3c5fd602d4f84bf18bf53883805a1cdd3))
* update 'as' prop type to React.ElementType ([07411e5](https://github.com/letanure/react-mobx-starter/commit/07411e5130936139b4d28a5524be02c13127c435))


### Features

* add animated demo GIF generation from E2E snapshots ([1059842](https://github.com/letanure/react-mobx-starter/commit/10598426c2f7627473139c9c980977abddde8c1c))
* add API service architecture with Rick & Morty example ([f338193](https://github.com/letanure/react-mobx-starter/commit/f3381930ca0d70c9883cbc9b0dc8c444cdd9a6ec))
* add automatic demo GIF refresh workflow ([7a2cc0b](https://github.com/letanure/react-mobx-starter/commit/7a2cc0b0c1e18da3e5dd9af16c24d0466768f9d0))
* add comprehensive date field support to FormBuilder ([20da18b](https://github.com/letanure/react-mobx-starter/commit/20da18babbc65a33e6486b3ab3d444c091f2d756))
* add comprehensive Docker containerization ([e2fe7f2](https://github.com/letanure/react-mobx-starter/commit/e2fe7f27fd52c482d215f1c48427f47a33513c26))
* add comprehensive feature flag system and language switching ([63f08c9](https://github.com/letanure/react-mobx-starter/commit/63f08c957c7f86d0111d5b596cc28b7724bd5ef5))
* add comprehensive FormBuilder system ([a9a7270](https://github.com/letanure/react-mobx-starter/commit/a9a72707d720c38596152a9c47f83dc9c0a2f3de))
* add comprehensive Storybook stories for custom UI components ([4e7697b](https://github.com/letanure/react-mobx-starter/commit/4e7697b1e6522dc8e6233102cf1e0751b2118e3f))
* add configurable page transitions with route-based control ([272060f](https://github.com/letanure/react-mobx-starter/commit/272060f512daa6a00cb54b81313e112c6c3038a1))
* add E2E testing npm scripts for local and CI snapshot updates ([610d77e](https://github.com/letanure/react-mobx-starter/commit/610d77eb7ba4abe8ad1516387a81d109dcf52a68))
* add Grid custom UI component ([8474f72](https://github.com/letanure/react-mobx-starter/commit/8474f72962dd5f995874a166aa05de72e2284ce4))
* add i18n support to FormBuilder validation messages ([ff61581](https://github.com/letanure/react-mobx-starter/commit/ff6158193ade56135b2f0d1e4a01970c6c1c778d))
* add MobX store persistence with localStorage ([6897302](https://github.com/letanure/react-mobx-starter/commit/6897302cd76fddaa0f87b33c7f20677ade84890c))
* add MSW for API mocking with co-located tests ([20b6c4d](https://github.com/letanure/react-mobx-starter/commit/20b6c4d92fc300a5f3138a1dd86f6bb1ae130784))
* add professional 404 and 500 error pages with routing integration ([652d49e](https://github.com/letanure/react-mobx-starter/commit/652d49e0c4ff561123909ee72772eccb0a04681e))
* add professional animation system with Motion library ([f52b7e1](https://github.com/letanure/react-mobx-starter/commit/f52b7e107dfc6d474d9b9904eec7c7e6f4e54441))
* add React Hook Form and Zod dependencies ([301f9e0](https://github.com/letanure/react-mobx-starter/commit/301f9e037606f7bcf1c4f5b507b4b28ce6da458a))
* add schema validation for persistence hydration ([3e5df6e](https://github.com/letanure/react-mobx-starter/commit/3e5df6e5f8af51892d1227b1e92de44f3be08ad2))
* add shadcn UI form components ([3d29320](https://github.com/letanure/react-mobx-starter/commit/3d29320b4a23a7e1460a08f8f97ffcab9d8efdfb))
* add smooth animations to TodoList feature ([d1b8853](https://github.com/letanure/react-mobx-starter/commit/d1b8853303f384681b4d6bd29e4dc6add1e1c9f8))
* add smooth exit animations to modal components ([10a7df4](https://github.com/letanure/react-mobx-starter/commit/10a7df4c154df1d0b658c7fc8df72b4148bb8507))
* add Text component stories ([d946999](https://github.com/letanure/react-mobx-starter/commit/d94699989868863991fc18d41668336ec44b9733))
* complete global systems implementation with ESC handling and route cleanup ([ca1a501](https://github.com/letanure/react-mobx-starter/commit/ca1a5011a423ee95d67b90e873e709774b7decad))
* implement comprehensive field array functionality with improved UX ([fc96086](https://github.com/letanure/react-mobx-starter/commit/fc960866648e44e5edeef0c4bdec59f8c1246833))
* implement dark/light theme system with shadcn/ui standards ([fc571af](https://github.com/letanure/react-mobx-starter/commit/fc571af350c08e7ae7a8dce7e9bff63d77c8a03e))
* implement feature registry pattern ([2502460](https://github.com/letanure/react-mobx-starter/commit/250246003e60e6b29d196f375fd85a37963b46f8))
* implement schema-first validation with Zod ([93fd0fd](https://github.com/letanure/react-mobx-starter/commit/93fd0fd57328b7adc7696f68b49dd5cb1d4c1684))
* integrate todo feature with schema-first validation and i18n ([332c717](https://github.com/letanure/react-mobx-starter/commit/332c717b5b00b5ae381be98c70bc69bc8c334766))
* refactor todo routes with URL params and dynamic breadcrumbs ([d027999](https://github.com/letanure/react-mobx-starter/commit/d0279997019d1804a6354ece90d333a2d0797fc9))
* standardize CI to use same check:all command as pre-push hook ([cb0215c](https://github.com/letanure/react-mobx-starter/commit/cb0215c222e5943fe8f748fbc28558564a1f9992))


### Performance Improvements

* optimize bundle size with manual chunking strategy ([606827e](https://github.com/letanure/react-mobx-starter/commit/606827e64d34f9c05daa59ed5751189bc54a4878))
* optimize E2E tests for faster CI execution ([4f6843b](https://github.com/letanure/react-mobx-starter/commit/4f6843b9d16898851edb90d81f356e06cad14104))

# [1.4.0](https://github.com/letanure/react-mobx-starter/compare/v1.3.0...v1.4.0) (2025-08-07)


### Bug Fixes

* add required args with tag prop to Text stories with render functions ([dbcd5d7](https://github.com/letanure/react-mobx-starter/commit/dbcd5d7640a35f138f04cc9844e7397082b8ba82))
* add required resetLabel prop to FormBuilder ([7bed6ee](https://github.com/letanure/react-mobx-starter/commit/7bed6ee8c85c988cc5f3bd1d841931da7055a352))
* apply biome linting fixes and fix test setup ([327480d](https://github.com/letanure/react-mobx-starter/commit/327480d3aecd4445241ddfbd00c706c3b7c82e09))
* correct E2E test navigation and element selectors ([37ba154](https://github.com/letanure/react-mobx-starter/commit/37ba15444a94cd0733baef4a6c79d0b1350c27f2))
* correct FormBuilder usage in UserFormContent ([d5606d0](https://github.com/letanure/react-mobx-starter/commit/d5606d0bcb0e7af49c44203715dbad6f8586d7ce))
* format biome.json with proper negation syntax ([519ea6d](https://github.com/letanure/react-mobx-starter/commit/519ea6df9da771062bafdaf56ff16a6c33206558))
* implement proper validation error messages and controlled form inputs ([6a4cae7](https://github.com/letanure/react-mobx-starter/commit/6a4cae78752f945e91954bd8bf0afbd8b3a2e699))
* move and update button stories file ([a8fc442](https://github.com/letanure/react-mobx-starter/commit/a8fc442a639dbe3ba5c94108ada46ebffbd39b0d))
* properly ignore mockServiceWorker.js in biome config ([eab7140](https://github.com/letanure/react-mobx-starter/commit/eab7140d086d0e9b2dd7ccbff134a5d06fd1bf46))
* remove markdown files from Biome lint-staged config ([2d50f50](https://github.com/letanure/react-mobx-starter/commit/2d50f508479290bbba78eb9ce035e26532e4d667))
* remove unused args from Text stories with custom render functions ([fa44382](https://github.com/letanure/react-mobx-starter/commit/fa4438258ba8e86f0a7a5b5d46f22172e4a446fd))
* rename Button.tsx to button.tsx for consistent casing ([0b4f3be](https://github.com/letanure/react-mobx-starter/commit/0b4f3be36f1f8310b44bbc56ac5c34a33e07819c))
* resolve all linting and accessibility issues - zero errors ([0b50b69](https://github.com/letanure/react-mobx-starter/commit/0b50b69b20ce86ae84346a685c2046668748505b))
* resolve all TypeScript build errors ([54a805d](https://github.com/letanure/react-mobx-starter/commit/54a805d05d113cbd90c648c79ea1aee3cf532048))
* resolve FormBuilder circular import by renaming main component file ([0479b61](https://github.com/letanure/react-mobx-starter/commit/0479b61a5b1b421a58688f234cc9d2e892d72012))
* resolve FormBuilder component type errors ([e4515e9](https://github.com/letanure/react-mobx-starter/commit/e4515e983ff13bf20ade48d839ca9a775d52df67))
* resolve linting issues and ignore mockServiceWorker.js ([bf94d85](https://github.com/letanure/react-mobx-starter/commit/bf94d85bfbe7b8a30ff194e9272088bd0e4d0b06))
* resolve RootStore type assertion for object parameter ([c6c4fca](https://github.com/letanure/react-mobx-starter/commit/c6c4fca2b698f0d6cf5dfe442ea9e7d6f392cb67))
* resolve TypeScript build errors in FormBuilder components ([7c78864](https://github.com/letanure/react-mobx-starter/commit/7c78864bf8c96fc94018f1824924fae954056a7e))
* resolve TypeScript errors for push ([cfc9bd2](https://github.com/letanure/react-mobx-starter/commit/cfc9bd2f10a2f2746bd50f49d9f621a9e98a0a63))
* resolve TypeScript errors in Text and Divider components ([d29ed2e](https://github.com/letanure/react-mobx-starter/commit/d29ed2ea93acc334256ba445801c40288c30f55d))
* simplify and align path aliases between vite and tsconfig ([20dc47d](https://github.com/letanure/react-mobx-starter/commit/20dc47d04b7f5c2bda635aae5337b22b68b2cf7f))
* trigger CI with proper E2E snapshots ([d38880c](https://github.com/letanure/react-mobx-starter/commit/d38880c407094a5c1ec78996f9fada73edef754f))
* update 'as' prop type in BoxProps to React.ElementType for better flexibility ([6b1155f](https://github.com/letanure/react-mobx-starter/commit/6b1155f3c5fd602d4f84bf18bf53883805a1cdd3))
* update 'as' prop type to React.ElementType ([07411e5](https://github.com/letanure/react-mobx-starter/commit/07411e5130936139b4d28a5524be02c13127c435))


### Features

* add animated demo GIF generation from E2E snapshots ([1059842](https://github.com/letanure/react-mobx-starter/commit/10598426c2f7627473139c9c980977abddde8c1c))
* add API service architecture with Rick & Morty example ([f338193](https://github.com/letanure/react-mobx-starter/commit/f3381930ca0d70c9883cbc9b0dc8c444cdd9a6ec))
* add automatic demo GIF refresh workflow ([7a2cc0b](https://github.com/letanure/react-mobx-starter/commit/7a2cc0b0c1e18da3e5dd9af16c24d0466768f9d0))
* add comprehensive date field support to FormBuilder ([20da18b](https://github.com/letanure/react-mobx-starter/commit/20da18babbc65a33e6486b3ab3d444c091f2d756))
* add comprehensive Docker containerization ([e2fe7f2](https://github.com/letanure/react-mobx-starter/commit/e2fe7f27fd52c482d215f1c48427f47a33513c26))
* add comprehensive feature flag system and language switching ([63f08c9](https://github.com/letanure/react-mobx-starter/commit/63f08c957c7f86d0111d5b596cc28b7724bd5ef5))
* add comprehensive FormBuilder system ([a9a7270](https://github.com/letanure/react-mobx-starter/commit/a9a72707d720c38596152a9c47f83dc9c0a2f3de))
* add comprehensive Storybook stories for custom UI components ([4e7697b](https://github.com/letanure/react-mobx-starter/commit/4e7697b1e6522dc8e6233102cf1e0751b2118e3f))
* add configurable page transitions with route-based control ([272060f](https://github.com/letanure/react-mobx-starter/commit/272060f512daa6a00cb54b81313e112c6c3038a1))
* add E2E testing npm scripts for local and CI snapshot updates ([610d77e](https://github.com/letanure/react-mobx-starter/commit/610d77eb7ba4abe8ad1516387a81d109dcf52a68))
* add Grid custom UI component ([8474f72](https://github.com/letanure/react-mobx-starter/commit/8474f72962dd5f995874a166aa05de72e2284ce4))
* add i18n support to FormBuilder validation messages ([ff61581](https://github.com/letanure/react-mobx-starter/commit/ff6158193ade56135b2f0d1e4a01970c6c1c778d))
* add MobX store persistence with localStorage ([6897302](https://github.com/letanure/react-mobx-starter/commit/6897302cd76fddaa0f87b33c7f20677ade84890c))
* add MSW for API mocking with co-located tests ([20b6c4d](https://github.com/letanure/react-mobx-starter/commit/20b6c4d92fc300a5f3138a1dd86f6bb1ae130784))
* add professional 404 and 500 error pages with routing integration ([652d49e](https://github.com/letanure/react-mobx-starter/commit/652d49e0c4ff561123909ee72772eccb0a04681e))
* add professional animation system with Motion library ([f52b7e1](https://github.com/letanure/react-mobx-starter/commit/f52b7e107dfc6d474d9b9904eec7c7e6f4e54441))
* add React Hook Form and Zod dependencies ([301f9e0](https://github.com/letanure/react-mobx-starter/commit/301f9e037606f7bcf1c4f5b507b4b28ce6da458a))
* add schema validation for persistence hydration ([3e5df6e](https://github.com/letanure/react-mobx-starter/commit/3e5df6e5f8af51892d1227b1e92de44f3be08ad2))
* add shadcn UI form components ([3d29320](https://github.com/letanure/react-mobx-starter/commit/3d29320b4a23a7e1460a08f8f97ffcab9d8efdfb))
* add smooth animations to TodoList feature ([d1b8853](https://github.com/letanure/react-mobx-starter/commit/d1b8853303f384681b4d6bd29e4dc6add1e1c9f8))
* add smooth exit animations to modal components ([10a7df4](https://github.com/letanure/react-mobx-starter/commit/10a7df4c154df1d0b658c7fc8df72b4148bb8507))
* add Text component stories ([d946999](https://github.com/letanure/react-mobx-starter/commit/d94699989868863991fc18d41668336ec44b9733))
* complete global systems implementation with ESC handling and route cleanup ([ca1a501](https://github.com/letanure/react-mobx-starter/commit/ca1a5011a423ee95d67b90e873e709774b7decad))
* implement comprehensive field array functionality with improved UX ([fc96086](https://github.com/letanure/react-mobx-starter/commit/fc960866648e44e5edeef0c4bdec59f8c1246833))
* implement dark/light theme system with shadcn/ui standards ([fc571af](https://github.com/letanure/react-mobx-starter/commit/fc571af350c08e7ae7a8dce7e9bff63d77c8a03e))
* implement feature registry pattern ([2502460](https://github.com/letanure/react-mobx-starter/commit/250246003e60e6b29d196f375fd85a37963b46f8))
* implement schema-first validation with Zod ([93fd0fd](https://github.com/letanure/react-mobx-starter/commit/93fd0fd57328b7adc7696f68b49dd5cb1d4c1684))
* integrate todo feature with schema-first validation and i18n ([332c717](https://github.com/letanure/react-mobx-starter/commit/332c717b5b00b5ae381be98c70bc69bc8c334766))
* refactor todo routes with URL params and dynamic breadcrumbs ([d027999](https://github.com/letanure/react-mobx-starter/commit/d0279997019d1804a6354ece90d333a2d0797fc9))
* standardize CI to use same check:all command as pre-push hook ([cb0215c](https://github.com/letanure/react-mobx-starter/commit/cb0215c222e5943fe8f748fbc28558564a1f9992))


### Performance Improvements

* optimize bundle size with manual chunking strategy ([606827e](https://github.com/letanure/react-mobx-starter/commit/606827e64d34f9c05daa59ed5751189bc54a4878))
* optimize E2E tests for faster CI execution ([4f6843b](https://github.com/letanure/react-mobx-starter/commit/4f6843b9d16898851edb90d81f356e06cad14104))

# [1.4.0](https://github.com/letanure/react-mobx-starter/compare/v1.3.0...v1.4.0) (2025-08-07)


### Bug Fixes

* add required args with tag prop to Text stories with render functions ([dbcd5d7](https://github.com/letanure/react-mobx-starter/commit/dbcd5d7640a35f138f04cc9844e7397082b8ba82))
* add required resetLabel prop to FormBuilder ([7bed6ee](https://github.com/letanure/react-mobx-starter/commit/7bed6ee8c85c988cc5f3bd1d841931da7055a352))
* apply biome linting fixes and fix test setup ([327480d](https://github.com/letanure/react-mobx-starter/commit/327480d3aecd4445241ddfbd00c706c3b7c82e09))
* correct E2E test navigation and element selectors ([37ba154](https://github.com/letanure/react-mobx-starter/commit/37ba15444a94cd0733baef4a6c79d0b1350c27f2))
* correct FormBuilder usage in UserFormContent ([d5606d0](https://github.com/letanure/react-mobx-starter/commit/d5606d0bcb0e7af49c44203715dbad6f8586d7ce))
* format biome.json with proper negation syntax ([519ea6d](https://github.com/letanure/react-mobx-starter/commit/519ea6df9da771062bafdaf56ff16a6c33206558))
* implement proper validation error messages and controlled form inputs ([6a4cae7](https://github.com/letanure/react-mobx-starter/commit/6a4cae78752f945e91954bd8bf0afbd8b3a2e699))
* move and update button stories file ([a8fc442](https://github.com/letanure/react-mobx-starter/commit/a8fc442a639dbe3ba5c94108ada46ebffbd39b0d))
* properly ignore mockServiceWorker.js in biome config ([eab7140](https://github.com/letanure/react-mobx-starter/commit/eab7140d086d0e9b2dd7ccbff134a5d06fd1bf46))
* remove markdown files from Biome lint-staged config ([2d50f50](https://github.com/letanure/react-mobx-starter/commit/2d50f508479290bbba78eb9ce035e26532e4d667))
* remove unused args from Text stories with custom render functions ([fa44382](https://github.com/letanure/react-mobx-starter/commit/fa4438258ba8e86f0a7a5b5d46f22172e4a446fd))
* rename Button.tsx to button.tsx for consistent casing ([0b4f3be](https://github.com/letanure/react-mobx-starter/commit/0b4f3be36f1f8310b44bbc56ac5c34a33e07819c))
* resolve all linting and accessibility issues - zero errors ([0b50b69](https://github.com/letanure/react-mobx-starter/commit/0b50b69b20ce86ae84346a685c2046668748505b))
* resolve all TypeScript build errors ([54a805d](https://github.com/letanure/react-mobx-starter/commit/54a805d05d113cbd90c648c79ea1aee3cf532048))
* resolve FormBuilder circular import by renaming main component file ([0479b61](https://github.com/letanure/react-mobx-starter/commit/0479b61a5b1b421a58688f234cc9d2e892d72012))
* resolve FormBuilder component type errors ([e4515e9](https://github.com/letanure/react-mobx-starter/commit/e4515e983ff13bf20ade48d839ca9a775d52df67))
* resolve linting issues and ignore mockServiceWorker.js ([bf94d85](https://github.com/letanure/react-mobx-starter/commit/bf94d85bfbe7b8a30ff194e9272088bd0e4d0b06))
* resolve RootStore type assertion for object parameter ([c6c4fca](https://github.com/letanure/react-mobx-starter/commit/c6c4fca2b698f0d6cf5dfe442ea9e7d6f392cb67))
* resolve TypeScript build errors in FormBuilder components ([7c78864](https://github.com/letanure/react-mobx-starter/commit/7c78864bf8c96fc94018f1824924fae954056a7e))
* resolve TypeScript errors for push ([cfc9bd2](https://github.com/letanure/react-mobx-starter/commit/cfc9bd2f10a2f2746bd50f49d9f621a9e98a0a63))
* resolve TypeScript errors in Text and Divider components ([d29ed2e](https://github.com/letanure/react-mobx-starter/commit/d29ed2ea93acc334256ba445801c40288c30f55d))
* simplify and align path aliases between vite and tsconfig ([20dc47d](https://github.com/letanure/react-mobx-starter/commit/20dc47d04b7f5c2bda635aae5337b22b68b2cf7f))
* update 'as' prop type in BoxProps to React.ElementType for better flexibility ([6b1155f](https://github.com/letanure/react-mobx-starter/commit/6b1155f3c5fd602d4f84bf18bf53883805a1cdd3))
* update 'as' prop type to React.ElementType ([07411e5](https://github.com/letanure/react-mobx-starter/commit/07411e5130936139b4d28a5524be02c13127c435))


### Features

* add animated demo GIF generation from E2E snapshots ([1059842](https://github.com/letanure/react-mobx-starter/commit/10598426c2f7627473139c9c980977abddde8c1c))
* add API service architecture with Rick & Morty example ([f338193](https://github.com/letanure/react-mobx-starter/commit/f3381930ca0d70c9883cbc9b0dc8c444cdd9a6ec))
* add automatic demo GIF refresh workflow ([7a2cc0b](https://github.com/letanure/react-mobx-starter/commit/7a2cc0b0c1e18da3e5dd9af16c24d0466768f9d0))
* add comprehensive date field support to FormBuilder ([20da18b](https://github.com/letanure/react-mobx-starter/commit/20da18babbc65a33e6486b3ab3d444c091f2d756))
* add comprehensive Docker containerization ([e2fe7f2](https://github.com/letanure/react-mobx-starter/commit/e2fe7f27fd52c482d215f1c48427f47a33513c26))
* add comprehensive feature flag system and language switching ([63f08c9](https://github.com/letanure/react-mobx-starter/commit/63f08c957c7f86d0111d5b596cc28b7724bd5ef5))
* add comprehensive FormBuilder system ([a9a7270](https://github.com/letanure/react-mobx-starter/commit/a9a72707d720c38596152a9c47f83dc9c0a2f3de))
* add comprehensive Storybook stories for custom UI components ([4e7697b](https://github.com/letanure/react-mobx-starter/commit/4e7697b1e6522dc8e6233102cf1e0751b2118e3f))
* add configurable page transitions with route-based control ([272060f](https://github.com/letanure/react-mobx-starter/commit/272060f512daa6a00cb54b81313e112c6c3038a1))
* add E2E testing npm scripts for local and CI snapshot updates ([610d77e](https://github.com/letanure/react-mobx-starter/commit/610d77eb7ba4abe8ad1516387a81d109dcf52a68))
* add Grid custom UI component ([8474f72](https://github.com/letanure/react-mobx-starter/commit/8474f72962dd5f995874a166aa05de72e2284ce4))
* add i18n support to FormBuilder validation messages ([ff61581](https://github.com/letanure/react-mobx-starter/commit/ff6158193ade56135b2f0d1e4a01970c6c1c778d))
* add MobX store persistence with localStorage ([6897302](https://github.com/letanure/react-mobx-starter/commit/6897302cd76fddaa0f87b33c7f20677ade84890c))
* add MSW for API mocking with co-located tests ([20b6c4d](https://github.com/letanure/react-mobx-starter/commit/20b6c4d92fc300a5f3138a1dd86f6bb1ae130784))
* add professional 404 and 500 error pages with routing integration ([652d49e](https://github.com/letanure/react-mobx-starter/commit/652d49e0c4ff561123909ee72772eccb0a04681e))
* add professional animation system with Motion library ([f52b7e1](https://github.com/letanure/react-mobx-starter/commit/f52b7e107dfc6d474d9b9904eec7c7e6f4e54441))
* add React Hook Form and Zod dependencies ([301f9e0](https://github.com/letanure/react-mobx-starter/commit/301f9e037606f7bcf1c4f5b507b4b28ce6da458a))
* add schema validation for persistence hydration ([3e5df6e](https://github.com/letanure/react-mobx-starter/commit/3e5df6e5f8af51892d1227b1e92de44f3be08ad2))
* add shadcn UI form components ([3d29320](https://github.com/letanure/react-mobx-starter/commit/3d29320b4a23a7e1460a08f8f97ffcab9d8efdfb))
* add smooth animations to TodoList feature ([d1b8853](https://github.com/letanure/react-mobx-starter/commit/d1b8853303f384681b4d6bd29e4dc6add1e1c9f8))
* add smooth exit animations to modal components ([10a7df4](https://github.com/letanure/react-mobx-starter/commit/10a7df4c154df1d0b658c7fc8df72b4148bb8507))
* add Text component stories ([d946999](https://github.com/letanure/react-mobx-starter/commit/d94699989868863991fc18d41668336ec44b9733))
* complete global systems implementation with ESC handling and route cleanup ([ca1a501](https://github.com/letanure/react-mobx-starter/commit/ca1a5011a423ee95d67b90e873e709774b7decad))
* implement comprehensive field array functionality with improved UX ([fc96086](https://github.com/letanure/react-mobx-starter/commit/fc960866648e44e5edeef0c4bdec59f8c1246833))
* implement dark/light theme system with shadcn/ui standards ([fc571af](https://github.com/letanure/react-mobx-starter/commit/fc571af350c08e7ae7a8dce7e9bff63d77c8a03e))
* implement feature registry pattern ([2502460](https://github.com/letanure/react-mobx-starter/commit/250246003e60e6b29d196f375fd85a37963b46f8))
* implement schema-first validation with Zod ([93fd0fd](https://github.com/letanure/react-mobx-starter/commit/93fd0fd57328b7adc7696f68b49dd5cb1d4c1684))
* integrate todo feature with schema-first validation and i18n ([332c717](https://github.com/letanure/react-mobx-starter/commit/332c717b5b00b5ae381be98c70bc69bc8c334766))
* refactor todo routes with URL params and dynamic breadcrumbs ([d027999](https://github.com/letanure/react-mobx-starter/commit/d0279997019d1804a6354ece90d333a2d0797fc9))
* standardize CI to use same check:all command as pre-push hook ([cb0215c](https://github.com/letanure/react-mobx-starter/commit/cb0215c222e5943fe8f748fbc28558564a1f9992))


### Performance Improvements

* optimize bundle size with manual chunking strategy ([606827e](https://github.com/letanure/react-mobx-starter/commit/606827e64d34f9c05daa59ed5751189bc54a4878))
* optimize E2E tests for faster CI execution ([4f6843b](https://github.com/letanure/react-mobx-starter/commit/4f6843b9d16898851edb90d81f356e06cad14104))

# [1.4.0](https://github.com/letanure/react-mobx-starter/compare/v1.3.0...v1.4.0) (2025-08-07)


### Bug Fixes

* add required args with tag prop to Text stories with render functions ([dbcd5d7](https://github.com/letanure/react-mobx-starter/commit/dbcd5d7640a35f138f04cc9844e7397082b8ba82))
* add required resetLabel prop to FormBuilder ([7bed6ee](https://github.com/letanure/react-mobx-starter/commit/7bed6ee8c85c988cc5f3bd1d841931da7055a352))
* apply biome linting fixes and fix test setup ([327480d](https://github.com/letanure/react-mobx-starter/commit/327480d3aecd4445241ddfbd00c706c3b7c82e09))
* correct E2E test navigation and element selectors ([37ba154](https://github.com/letanure/react-mobx-starter/commit/37ba15444a94cd0733baef4a6c79d0b1350c27f2))
* correct FormBuilder usage in UserFormContent ([d5606d0](https://github.com/letanure/react-mobx-starter/commit/d5606d0bcb0e7af49c44203715dbad6f8586d7ce))
* format biome.json with proper negation syntax ([519ea6d](https://github.com/letanure/react-mobx-starter/commit/519ea6df9da771062bafdaf56ff16a6c33206558))
* implement proper validation error messages and controlled form inputs ([6a4cae7](https://github.com/letanure/react-mobx-starter/commit/6a4cae78752f945e91954bd8bf0afbd8b3a2e699))
* move and update button stories file ([a8fc442](https://github.com/letanure/react-mobx-starter/commit/a8fc442a639dbe3ba5c94108ada46ebffbd39b0d))
* properly ignore mockServiceWorker.js in biome config ([eab7140](https://github.com/letanure/react-mobx-starter/commit/eab7140d086d0e9b2dd7ccbff134a5d06fd1bf46))
* remove markdown files from Biome lint-staged config ([2d50f50](https://github.com/letanure/react-mobx-starter/commit/2d50f508479290bbba78eb9ce035e26532e4d667))
* remove unused args from Text stories with custom render functions ([fa44382](https://github.com/letanure/react-mobx-starter/commit/fa4438258ba8e86f0a7a5b5d46f22172e4a446fd))
* rename Button.tsx to button.tsx for consistent casing ([0b4f3be](https://github.com/letanure/react-mobx-starter/commit/0b4f3be36f1f8310b44bbc56ac5c34a33e07819c))
* resolve all linting and accessibility issues - zero errors ([0b50b69](https://github.com/letanure/react-mobx-starter/commit/0b50b69b20ce86ae84346a685c2046668748505b))
* resolve all TypeScript build errors ([54a805d](https://github.com/letanure/react-mobx-starter/commit/54a805d05d113cbd90c648c79ea1aee3cf532048))
* resolve FormBuilder circular import by renaming main component file ([0479b61](https://github.com/letanure/react-mobx-starter/commit/0479b61a5b1b421a58688f234cc9d2e892d72012))
* resolve FormBuilder component type errors ([e4515e9](https://github.com/letanure/react-mobx-starter/commit/e4515e983ff13bf20ade48d839ca9a775d52df67))
* resolve linting issues and ignore mockServiceWorker.js ([bf94d85](https://github.com/letanure/react-mobx-starter/commit/bf94d85bfbe7b8a30ff194e9272088bd0e4d0b06))
* resolve RootStore type assertion for object parameter ([c6c4fca](https://github.com/letanure/react-mobx-starter/commit/c6c4fca2b698f0d6cf5dfe442ea9e7d6f392cb67))
* resolve TypeScript build errors in FormBuilder components ([7c78864](https://github.com/letanure/react-mobx-starter/commit/7c78864bf8c96fc94018f1824924fae954056a7e))
* resolve TypeScript errors for push ([cfc9bd2](https://github.com/letanure/react-mobx-starter/commit/cfc9bd2f10a2f2746bd50f49d9f621a9e98a0a63))
* resolve TypeScript errors in Text and Divider components ([d29ed2e](https://github.com/letanure/react-mobx-starter/commit/d29ed2ea93acc334256ba445801c40288c30f55d))
* simplify and align path aliases between vite and tsconfig ([20dc47d](https://github.com/letanure/react-mobx-starter/commit/20dc47d04b7f5c2bda635aae5337b22b68b2cf7f))
* update 'as' prop type in BoxProps to React.ElementType for better flexibility ([6b1155f](https://github.com/letanure/react-mobx-starter/commit/6b1155f3c5fd602d4f84bf18bf53883805a1cdd3))
* update 'as' prop type to React.ElementType ([07411e5](https://github.com/letanure/react-mobx-starter/commit/07411e5130936139b4d28a5524be02c13127c435))


### Features

* add animated demo GIF generation from E2E snapshots ([1059842](https://github.com/letanure/react-mobx-starter/commit/10598426c2f7627473139c9c980977abddde8c1c))
* add API service architecture with Rick & Morty example ([f338193](https://github.com/letanure/react-mobx-starter/commit/f3381930ca0d70c9883cbc9b0dc8c444cdd9a6ec))
* add automatic demo GIF refresh workflow ([7a2cc0b](https://github.com/letanure/react-mobx-starter/commit/7a2cc0b0c1e18da3e5dd9af16c24d0466768f9d0))
* add comprehensive date field support to FormBuilder ([20da18b](https://github.com/letanure/react-mobx-starter/commit/20da18babbc65a33e6486b3ab3d444c091f2d756))
* add comprehensive Docker containerization ([e2fe7f2](https://github.com/letanure/react-mobx-starter/commit/e2fe7f27fd52c482d215f1c48427f47a33513c26))
* add comprehensive feature flag system and language switching ([63f08c9](https://github.com/letanure/react-mobx-starter/commit/63f08c957c7f86d0111d5b596cc28b7724bd5ef5))
* add comprehensive FormBuilder system ([a9a7270](https://github.com/letanure/react-mobx-starter/commit/a9a72707d720c38596152a9c47f83dc9c0a2f3de))
* add comprehensive Storybook stories for custom UI components ([4e7697b](https://github.com/letanure/react-mobx-starter/commit/4e7697b1e6522dc8e6233102cf1e0751b2118e3f))
* add configurable page transitions with route-based control ([272060f](https://github.com/letanure/react-mobx-starter/commit/272060f512daa6a00cb54b81313e112c6c3038a1))
* add E2E testing npm scripts for local and CI snapshot updates ([610d77e](https://github.com/letanure/react-mobx-starter/commit/610d77eb7ba4abe8ad1516387a81d109dcf52a68))
* add Grid custom UI component ([8474f72](https://github.com/letanure/react-mobx-starter/commit/8474f72962dd5f995874a166aa05de72e2284ce4))
* add i18n support to FormBuilder validation messages ([ff61581](https://github.com/letanure/react-mobx-starter/commit/ff6158193ade56135b2f0d1e4a01970c6c1c778d))
* add MobX store persistence with localStorage ([6897302](https://github.com/letanure/react-mobx-starter/commit/6897302cd76fddaa0f87b33c7f20677ade84890c))
* add MSW for API mocking with co-located tests ([20b6c4d](https://github.com/letanure/react-mobx-starter/commit/20b6c4d92fc300a5f3138a1dd86f6bb1ae130784))
* add professional 404 and 500 error pages with routing integration ([652d49e](https://github.com/letanure/react-mobx-starter/commit/652d49e0c4ff561123909ee72772eccb0a04681e))
* add professional animation system with Motion library ([f52b7e1](https://github.com/letanure/react-mobx-starter/commit/f52b7e107dfc6d474d9b9904eec7c7e6f4e54441))
* add React Hook Form and Zod dependencies ([301f9e0](https://github.com/letanure/react-mobx-starter/commit/301f9e037606f7bcf1c4f5b507b4b28ce6da458a))
* add schema validation for persistence hydration ([3e5df6e](https://github.com/letanure/react-mobx-starter/commit/3e5df6e5f8af51892d1227b1e92de44f3be08ad2))
* add shadcn UI form components ([3d29320](https://github.com/letanure/react-mobx-starter/commit/3d29320b4a23a7e1460a08f8f97ffcab9d8efdfb))
* add smooth animations to TodoList feature ([d1b8853](https://github.com/letanure/react-mobx-starter/commit/d1b8853303f384681b4d6bd29e4dc6add1e1c9f8))
* add smooth exit animations to modal components ([10a7df4](https://github.com/letanure/react-mobx-starter/commit/10a7df4c154df1d0b658c7fc8df72b4148bb8507))
* add Text component stories ([d946999](https://github.com/letanure/react-mobx-starter/commit/d94699989868863991fc18d41668336ec44b9733))
* complete global systems implementation with ESC handling and route cleanup ([ca1a501](https://github.com/letanure/react-mobx-starter/commit/ca1a5011a423ee95d67b90e873e709774b7decad))
* implement comprehensive field array functionality with improved UX ([fc96086](https://github.com/letanure/react-mobx-starter/commit/fc960866648e44e5edeef0c4bdec59f8c1246833))
* implement dark/light theme system with shadcn/ui standards ([fc571af](https://github.com/letanure/react-mobx-starter/commit/fc571af350c08e7ae7a8dce7e9bff63d77c8a03e))
* implement feature registry pattern ([2502460](https://github.com/letanure/react-mobx-starter/commit/250246003e60e6b29d196f375fd85a37963b46f8))
* implement schema-first validation with Zod ([93fd0fd](https://github.com/letanure/react-mobx-starter/commit/93fd0fd57328b7adc7696f68b49dd5cb1d4c1684))
* integrate todo feature with schema-first validation and i18n ([332c717](https://github.com/letanure/react-mobx-starter/commit/332c717b5b00b5ae381be98c70bc69bc8c334766))
* refactor todo routes with URL params and dynamic breadcrumbs ([d027999](https://github.com/letanure/react-mobx-starter/commit/d0279997019d1804a6354ece90d333a2d0797fc9))
* standardize CI to use same check:all command as pre-push hook ([cb0215c](https://github.com/letanure/react-mobx-starter/commit/cb0215c222e5943fe8f748fbc28558564a1f9992))


### Performance Improvements

* optimize bundle size with manual chunking strategy ([606827e](https://github.com/letanure/react-mobx-starter/commit/606827e64d34f9c05daa59ed5751189bc54a4878))

# [1.3.0](https://github.com/letanure/react-mobx-starter/compare/v1.2.0...v1.3.0) (2025-08-05)


### Features

* add bundle size budgets and automated enforcement ([4c869ea](https://github.com/letanure/react-mobx-starter/commit/4c869eafe8e6707dedf99db4157fa96cd1cfa9d5))

# [1.2.0](https://github.com/letanure/react-mobx-starter/compare/v1.1.1...v1.2.0) (2025-08-05)


### Bug Fixes

* remove deprecated husky lines from pre-push hook ([5d95f71](https://github.com/letanure/react-mobx-starter/commit/5d95f714f5841efcd751163fcd1f661abf9035f6))


### Features

* add comprehensive performance monitoring setup ([841c5e7](https://github.com/letanure/react-mobx-starter/commit/841c5e718e99e1f3f43160ab0d02847f97c5ee8e))

## [1.1.1](https://github.com/letanure/react-mobx-starter/compare/v1.1.0...v1.1.1) (2025-08-05)


### Bug Fixes

* restore proper Button component with shadcn/ui implementation ([6102578](https://github.com/letanure/react-mobx-starter/commit/61025784399d2462364f3bfc17fad81ae2c26f98))

# [1.1.0](https://github.com/letanure/react-mobx-starter/compare/v1.0.0...v1.1.0) (2025-08-05)


### Bug Fixes

* correct import path for useIsMobile hook ([2c8e0cb](https://github.com/letanure/react-mobx-starter/commit/2c8e0cb70b59aa06ce2f752201c242255e30abf4))


### Features

* add @total-typescript/ts-reset dependency and update tsconfig for improved TypeScript support ([3a28f3f](https://github.com/letanure/react-mobx-starter/commit/3a28f3f8ab055acd9388a762be40da7605e19d7c))
* add CI/CD workflows and improve project structure ([4a1a56c](https://github.com/letanure/react-mobx-starter/commit/4a1a56c83744ec91fda3a52f208d5a0a9f46f97e))
* add Playwright E2E testing with visual regression ([3824aa2](https://github.com/letanure/react-mobx-starter/commit/3824aa23fafad76c8eb696102fd6f0f2ebd08d82))
* add production environment configuration and update .gitignore ([940fc18](https://github.com/letanure/react-mobx-starter/commit/940fc185b092ca7448787c23a165d69a7848493a))
* add Storybook ([c0fd409](https://github.com/letanure/react-mobx-starter/commit/c0fd4094cd02321d7b4cfc66b9bcac1edf057b1c))
* add useIsMobile hook for responsive design support ([1af9fd2](https://github.com/letanure/react-mobx-starter/commit/1af9fd24448720aa0f14438dd792521d5907a236))
* enhance application structure with new routing, error handling, and provider composition ([fb15581](https://github.com/letanure/react-mobx-starter/commit/fb15581bf5fd9cf36538acbbfa58bd78485da366))
* implement error boundary with demo and logging functionality ([ed355d9](https://github.com/letanure/react-mobx-starter/commit/ed355d98f824d0d5998d44b5f08158dcdae0abf6))
* implement sidebar component with context and mobile support ([5a52dc2](https://github.com/letanure/react-mobx-starter/commit/5a52dc2b9465cea2d756ea3f193977224fda6878))
* refactor routing and API structure, add centralized config, and enhance localization support ([65277f9](https://github.com/letanure/react-mobx-starter/commit/65277f9dc0359401dbf83a39384de5fbec37ce96))

# 1.0.0 (2025-08-05)


### Bug Fixes

* disable body-max-line-length rule for semantic-release compatibility ([9332f42](https://github.com/letanure/react-mobx-starter/commit/9332f4242bfe0c7ec8a0c9018b608b7fb041d0d6))
* update repository URL in package.json to correct repo name ([28666ac](https://github.com/letanure/react-mobx-starter/commit/28666ac3b83587c0d516b5848d928d4e26146da0))


### Features

* add architecture guidelines,  layout and demo counter components ([16d42be](https://github.com/letanure/react-mobx-starter/commit/16d42beb8b755a388db27d01c17954a831fc2767))
* add delete folder or delete folder and images ([4f4de14](https://github.com/letanure/react-mobx-starter/commit/4f4de14230b7b1ee365723d7f7cf81f15c4e4883))
* add design manager,  image upload and grid display ([2bdd2e6](https://github.com/letanure/react-mobx-starter/commit/2bdd2e6450553ecb3610f20666d599db054a5466))
* add ErrorBoundary  for app ([c876967](https://github.com/letanure/react-mobx-starter/commit/c876967e1388f0055418dd9deba46e430747e600))
* add folder management functionality with image moving capability ([8bd1918](https://github.com/letanure/react-mobx-starter/commit/8bd1918263a10dd37bf4e8020e2424696ccfc32d))
* add folder management tag like ([d4a372e](https://github.com/letanure/react-mobx-starter/commit/d4a372e0d5c93777d39976af6c692f92cd6a5a80))
* add Header ([b584405](https://github.com/letanure/react-mobx-starter/commit/b5844050fcee9a05ddf6098e82bc2e595dabca48))
* add husky pre-commit with linter ([0e97533](https://github.com/letanure/react-mobx-starter/commit/0e975339f941b736c6a2bd4de636babb2719b0ab))
* add image processing and upload ([6f888d4](https://github.com/letanure/react-mobx-starter/commit/6f888d46c02fb035bd19628aed951d42741a855d))
* add images to folders ([ac2684c](https://github.com/letanure/react-mobx-starter/commit/ac2684c1ca447c6f769aa592f7b7c33f779e5257))
* add local persistence with  Dexie indexDB ([7b16481](https://github.com/letanure/react-mobx-starter/commit/7b16481ca1dd91aeeba3c8d79c076edfebe3ea7f))
* add node version ([3c9c264](https://github.com/letanure/react-mobx-starter/commit/3c9c264720118e0ceb76d86e1cbf9ac87f2ad081))
* add React Router and i18n to coding challenge starter kit ([36e1d82](https://github.com/letanure/react-mobx-starter/commit/36e1d8237f120e76bf35bcc599161cb1bc77cab0))
* animate image cards ([263b742](https://github.com/letanure/react-mobx-starter/commit/263b742d0040dfd6132286f76e65e85294e6cf2f))
* delete image and buld delete ([a22e3c5](https://github.com/letanure/react-mobx-starter/commit/a22e3c50d37c85a9b774cce048dcef3b24cad961))
* folder URL sync ([4707e58](https://github.com/letanure/react-mobx-starter/commit/4707e5818276ad510cf6062925a51380d6c3cace))
* implement cleanup ([cbb9c1a](https://github.com/letanure/react-mobx-starter/commit/cbb9c1ada6ea1ec03ff208f5d6643067fb38e1d9))
* initialize Vite + React  + SWC ([c0f13be](https://github.com/letanure/react-mobx-starter/commit/c0f13bedaaf8257c202a7fb12f542c5126f5ca6f))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- This changelog will be automatically updated by semantic-release -->
