"use client";

import Link from "next/link";
import { ActionTooltip } from "../action-tooltip";
import { cn } from "@/libs/utils";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <ActionTooltip side="right" align="center" label={label}>
        <li onClick={handleClick}>
        <Link href={href} className={cn(`
            group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-emerald-500 transition hover:bg-gray-100
        `,
            active && "bg-gray-100 text-emerald-500"
        )}>
            <Icon className="h-6 w-6 shrink-0" />
            <span className="sr-only">{label}</span>
        </Link>
        </li>
    </ActionTooltip>
  );
};

export default DesktopItem;
