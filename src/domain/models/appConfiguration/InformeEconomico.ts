export interface MenuItem {
  id: number;
  label: string;
  path: string;
  category?: string;
  parent_id: number | null;
}
