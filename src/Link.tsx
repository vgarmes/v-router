import { AnchorHTMLAttributes, MouseEvent } from 'react';
import { EVENTS } from './constants';

function navigate(href: string) {
  window.history.pushState({}, '', href);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}
export function Link({ target, to, ...props }: LinkProps) {
  const handleClick = (event: MouseEvent) => {
    const isMainEvent = event.button === 0; // left click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === '_self'; // let browser handle target="_blank" etc

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}

Link.displayName = 'Link';
