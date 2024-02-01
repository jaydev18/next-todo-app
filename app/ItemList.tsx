import { MdDelete } from "react-icons/md";
interface Item {
  id: number;
  todo: string;
  checked: boolean;
}

interface ItemListProps {
  itemList: Item[];
  handleToggleCheckbox: (id: number) => void;
  handleDelete: (id: number) => void;
}

function ItemList({
  itemList,
  handleToggleCheckbox,
  handleDelete,
}: ItemListProps) {
  return (
    <ul className="list-group mt-3">
      {itemList.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{
            textDecoration: item.checked ? "line-through" : "none",
          }}
        >
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggleCheckbox(item.id)}
            />
            <span className="ms-2">{item.todo}</span>
          </div>
          <span
            onClick={() => handleDelete(item.id)}
            style={{ cursor: "pointer" }}
          >
            <MdDelete />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
