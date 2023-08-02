import { AnchorHTMLAttributes, MouseEvent } from 'react';
import { PathObject, dispatchPushStateEvent, getRelativeHref } from './utils';
import { useRouter } from '.';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | PathObject;
}

export function Link({ target, to, ...props }: LinkProps) {
  const { basename } = useRouter();
  const href = getRelativeHref(to, basename);
  const handleClick = (event: MouseEvent) => {
    const isMainEvent = event.button === 0; // left click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === '_self'; // let browser handle target="_blank" etc

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      dispatchPushStateEvent(href);
    }
  };

  return <a onClick={handleClick} href={href} target={target} {...props} />;
}

Link.displayName = 'Link';
