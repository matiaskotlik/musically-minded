export interface GenericSchema {
  Functions: Record<string, GenericFunction>;
  Tables: Record<string, GenericTable>;
  Views: Record<string, GenericView>;
}

interface GenericFunction {
  Args: Record<string, unknown>;
  Returns: unknown;
}

interface GenericNonUpdatableView {
  Relationships: GenericRelationship[];
  Row: Record<string, unknown>;
}

interface GenericRelationship {
  columns: string[];
  foreignKeyName: string;
  isOneToOne?: boolean;
  referencedColumns: string[];
  referencedRelation: string;
}

interface GenericTable {
  Insert: Record<string, unknown>;
  Relationships: GenericRelationship[];
  Row: Record<string, unknown>;
  Update: Record<string, unknown>;
}

interface GenericUpdatableView {
  Insert: Record<string, unknown>;
  Relationships: GenericRelationship[];
  Row: Record<string, unknown>;
  Update: Record<string, unknown>;
}

type GenericView = GenericNonUpdatableView | GenericUpdatableView;
