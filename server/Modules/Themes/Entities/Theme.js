/* @flow strict */

/**
 * Изменение полей темы необходимо делать в схеме пропсов Монго,
 * иначе неуказанные поля в схеме из файлов сидирования подтягиваться не будут.
 */
import Mongoose, { Schema } from 'mongoose';
import Path from 'path';
import _ from 'lodash';

import crypto from 'crypto';
import themesSeeds from './../Seeds';

type ThemeType = {
  [string]: string
};

type MetaType = {
  themes: Array<ThemeType>,
  keys: Array<string>,
  checksums: {
    [string]: {
      md5: string
    }
  }
};

export const meta: MetaType = _.reduce(themesSeeds, (acc: MetaType, theme: ThemeType, name: string): MetaType => {
  _.set(acc, 'keys', _.uniq([ ...acc.keys, ..._.keys(theme) ]));

  _.set(acc.checksums, `["${name}"].md5`, crypto.createHash('md5').update(JSON.stringify(theme)).digest('hex'));

  return acc;
}, {
  themes: themesSeeds,
  keys: [],
  checksums: {}
});

console.log(Path.resolve(__dirname));
console.table(meta.checksums);

// const { ObjectId } = Mongoose.Types;

const propertiesSchemaReducer = (result: {}, key: string): { [string]: {} } => ({
  [key]: { type: String },
  ...result
});
const propertiesSchema = _.reduce(meta.keys, propertiesSchemaReducer, {
  '--main-font-size': { type: String, required: true },
  '--bg-main': { type: String, required: true }
});

/* eslint-disable quotes */
const Properties = new Schema(propertiesSchema);

const Theme = Mongoose.model('Theme', {
  title: {
    type: String,
    required: true
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    default: null
  },

  public: {
    type: Boolean,
    required: true,
    default: false
  },

  filename: {
    type: String,
    require: true,
    unique: true,
    sparse: true
  },

  checksum: {
    type: String,
    require: true,
    unique: true,
    sparse: true
  },

  screenshot: {
    type: String,
    required: false
  },

  properties: {
    type: Properties,
    required: true
  }
});

Theme.getByFileName = async (filename: string): {} => {
  const theme = await Theme.findOne({ filename });
  const {
    _id, // eslint-disable-line
    ...CSSVars
  } = theme.properties._doc;
  const { checksum } = theme;

  return CSSVars;
};

export const DEFAULT_LIST = 'default';
export const ALLOWED_LIST = 'allowed';
export const OWNED_LIST = 'owned';

export default Theme;

// Warning: must be a real record in Mongo DB.
// Theme's filename for default use.
export const defaultTheme = 'default-common-theme.json';
