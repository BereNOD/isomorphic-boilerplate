/* @flow strict */

export type RecordType = {
  id: null | number,
  name: string,
  position_id: ?number
};

export type ListType = Array<RecordType>;
