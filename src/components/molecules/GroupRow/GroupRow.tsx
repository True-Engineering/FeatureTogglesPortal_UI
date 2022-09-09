import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './GroupRow.styles';

export interface IGroupRowProps {
  group: string;
  children: React.ReactNode;
}

const GroupRow: FC<IGroupRowProps> = ({ group, children }) => {
  const { classes } = useFeatureTogglesTheme('GroupRow', styles, {});
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <tr
        className={classes.groupRowHeader}
        onClick={() => setIsOpened(!isOpened)}
      >
        <td colSpan={5}>
          <div className={classes.headerText}>
            <div className={clsx(classes.arrow, isOpened && classes.open)}>
              <Icon type="chevron-right" />
            </div>
            <span className={classes.groupName}>{group}</span>
          </div>
        </td>
        <td />
      </tr>
      {isOpened && children}
    </>
  );
};

export default GroupRow;
