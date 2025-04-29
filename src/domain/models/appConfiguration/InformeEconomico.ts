export interface MenuItem {
  orden: any;
  id: number;
  label: string;
  path: string;
  category?: string;
  parent_id: number | null;
}
