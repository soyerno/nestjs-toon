## ADDED Requirements

### Requirement: MIT License File
El proyecto SHALL contener un archivo LICENSE con el texto completo oficial de MIT License.

#### Scenario: Archivo LICENSE existe en root
- **WHEN** se examina el directorio root del proyecto
- **THEN** existe archivo llamado exactamente `LICENSE` (sin extensión)
- **AND** archivo está en mismo nivel que package.json

#### Scenario: Contenido de LICENSE es MIT oficial
- **WHEN** se lee el contenido de LICENSE
- **THEN** contiene texto completo y oficial de MIT License
- **AND** incluye año 2025
- **AND** incluye nombre del titular del copyright

#### Scenario: LICENSE incluye todas las secciones requeridas
- **WHEN** LICENSE es analizado
- **THEN** incluye permiso de uso, copia, modificación, merge, publicación
- **AND** incluye condición de incluir copyright notice
- **AND** incluye disclaimer "AS IS" y limitación de garantías

### Requirement: License Distribution
El archivo LICENSE SHALL ser distribuido con todas las publicaciones del paquete npm.

#### Scenario: LICENSE en publicación npm
- **WHEN** paquete es empaquetado con `npm pack`
- **THEN** archivo LICENSE está incluido en tarball
- **AND** usuarios que instalan el paquete reciben LICENSE

#### Scenario: LICENSE en campo files
- **WHEN** package.json contiene campo `files`
- **THEN** `files` array incluye `"LICENSE"`
- **AND** npm incluye explícitamente LICENSE en publicación

### Requirement: License Consistency
La licencia declarada en package.json SHALL coincidir con el archivo LICENSE.

#### Scenario: Package.json declara MIT
- **WHEN** package.json es leído
- **THEN** campo `license` tiene valor `"MIT"`
- **AND** coincide con licencia en archivo LICENSE

#### Scenario: GitHub detecta licencia automáticamente
- **WHEN** repositorio está en GitHub
- **THEN** GitHub reconoce y muestra "MIT License"
- **AND** badge de licencia es visible en interfaz de GitHub

### Requirement: Legal Compliance
El proyecto SHALL cumplir con requirements legales de distribución open source.

#### Scenario: Usuarios conocen sus derechos
- **WHEN** usuario descarga o instala el paquete
- **THEN** puede acceder y leer archivo LICENSE
- **AND** entiende bajo qué términos puede usar el software

#### Scenario: Redistribución cumple con MIT
- **WHEN** terceros redistribuyen el código
- **THEN** LICENSE les indica que deben incluir copyright notice
- **AND** términos de MIT son claros y ejecutables

### Requirement: File Format and Encoding
El archivo LICENSE SHALL usar formato y encoding estándares.

#### Scenario: Encoding UTF-8
- **WHEN** LICENSE es leído
- **THEN** usa encoding UTF-8
- **AND** es legible en cualquier editor de texto

#### Scenario: Line endings consistentes
- **WHEN** LICENSE es versionado en Git
- **THEN** usa LF line endings (Unix-style)
- **AND** es consistente con resto del proyecto
