import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-bl from-light-secondary-color/30 dark:from-light-secondary-color/30 dark:to-dark-primary-color/10 to-light-primary-color/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
