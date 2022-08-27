interface ItemTypes {
  text:string;
  link:string;
}

interface ThemeConfigType {
  sidebar: ItemTypes[]
}

interface ConfigType {
  themConfig:ThemeConfigType
}

type getMdH1TitleTypes = (filePath:string, fileName:string) => Promise<string>;

type AutoGenerateConfigTypes = (config:ConfigType, rootfolderPath:string) => ConfigType;
