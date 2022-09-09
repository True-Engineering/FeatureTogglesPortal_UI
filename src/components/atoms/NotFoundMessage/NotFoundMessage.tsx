import React, { FC } from 'react';
import { useFeatureTogglesTheme } from '../../../hooks';
import { styles } from './NotFoundMessage.styles';

export interface INotFoundMessageProps {
  code?: number;
  header?: string;
  description?: string;
  children?: React.ReactNode;
}

const NotFoundMessage: FC<INotFoundMessageProps> = ({
  code,
  description,
  header,
  children,
}) => {
  const { classes } = useFeatureTogglesTheme('NotFoundMessage', styles, {});

  return (
    <div className={classes.root}>
      {code !== undefined && (
        <div className={classes.code}>
          {[...String(code)].map((num, i) => (
            <div key={i} className={classes.number}>
              {num}
            </div>
          ))}
        </div>
      )}
      {(header !== undefined || description !== undefined) && (
        <div className={classes.content}>
          {header !== undefined && (
            <div className={classes.header}>{header}</div>
          )}
          {description !== undefined && (
            <div className={classes.description}>{description}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default NotFoundMessage;
