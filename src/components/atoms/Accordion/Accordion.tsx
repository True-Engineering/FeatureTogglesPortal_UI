import React, { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import { Icon } from '@true-engineering/true-react-common-ui-kit';
import { useFeatureTogglesTheme } from '../../../hooks';
import { useCollapseAnimationStyles } from '../../commonStyles';
import { AccordionStyles, styles } from './Accordion.styles';

export interface IAccordionItem {
  key: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
  initialIsOpened?: boolean;
}
export interface IAccordionProps {
  items: IAccordionItem[];
  tweakStyles?: AccordionStyles;
}

const Accordion: FC<IAccordionProps> = ({ items, tweakStyles }) => {
  // чтобы классы не пересоздавались для каждого AccordionItem,
  // создадим стили здесь и передадим их через props
  const { classes } = useFeatureTogglesTheme('Accordion', styles, tweakStyles);

  return (
    <div className={classes.root}>
      {items.map(item => (
        <AccordionItem key={item.key} classes={classes} item={item} />
      ))}
    </div>
  );
};

export interface IAccordionItemProps {
  item: IAccordionItem;
  classes: Record<keyof AccordionStyles, string>;
}

const AccordionItem: FC<IAccordionItemProps> = ({
  item: { title, content, initialIsOpened = false },
  classes,
}) => {
  const collapseAnimationClasses = useCollapseAnimationStyles();
  const [isOpened, setIsOpened] = useState(initialIsOpened);

  return (
    <div className={classes.item}>
      <div className={classes.header} onClick={() => setIsOpened(v => !v)}>
        <div className={clsx(classes.arrow, isOpened && classes.openArrow)}>
          <Icon type="chevron-right" />
        </div>
        <div className={classes.title}>{title}</div>
      </div>

      <CSSTransition
        in={isOpened}
        timeout={300}
        unmountOnExit
        classNames={collapseAnimationClasses}
      >
        <div>
          <div className={classes.content}>{content}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Accordion;
