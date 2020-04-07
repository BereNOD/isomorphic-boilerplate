/* @flow strict */

import _ from 'lodash';
import chalk from 'chalk';
import themesSeeds from './../Seeds';

import Theme, { meta } from '/Modules/Themes/Entities/Theme.js';

class ThemeModel {
  static getThemeByFileName = async (filename: string = process.env.DEFAULT_THEME): {} =>
    await Theme.getByFileName(filename);

  static allowedKeys = (): Array<string> => meta.keys;

  static seed = () => {
    _.forEach(themesSeeds, async (seed: ThemeType, title: string) => {
      const { md5 } = meta.checksums[title];

      const theme = await Theme.findOne({ title });

      if (theme) {
        if (theme.checksum === md5) {
          console.log(chalk.blue('[DB Seeding: themes]:'), chalk.grey(`"${title}" - OK`));
        } else {
          theme.properties = seed;
          theme.checksum = md5;

          await theme.save();
        }
      } else {
        new Theme({
          title,
          public: true,
          filename: `${title}.json`,
          screenshot: `/dist/media/img/themes/${title}.png`,
          checksum: md5,
          properties: seed
        })
          .save();

        console.log(chalk.blue('[DB Seeding: themes]'), `Preloaded theme "${title}" are ${chalk.green('seeded')}.`);
      }
    });
  };
}

ThemeModel.seed();

export default ThemeModel;
