'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '@/store/store';
import { fetchDishes, createDish, updateDish, deleteDish } from '@/store/dishes/dishesThunks';

const AdminDishesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dishes = useSelector((s: RootState) => s.dishes.items);
  const loading = useSelector((s: RootState) => s.dishes.loading);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('0');
  const [image, setImage] = useState('');

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setPrice('0');
    setImage('');
  };

  const startEdit = (dish: any) => {
    setEditingId(dish.id);
    setTitle(dish.title);
    setPrice(String(dish.price));
    setImage(dish.image);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const p = Number(price);
    if (!title.trim() || !image.trim() || Number.isNaN(p) || p <= 0) {
      alert('Заполни корректно Title/Price/Image');
      return;
    }

    const payload = { title: title.trim(), price: p, image: image.trim() };

    if (editingId) {
      dispatch(updateDish({ id: editingId, dish: payload }));
      resetForm();
      return;
    }

    dispatch(createDish(payload));
    resetForm();
  };

  return (
    <div>
      <h2 className="h5 mb-3">Dishes</h2>

      <form className="border rounded p-3 mb-3" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="mb-2">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-dark" type="submit">
            {isEditing ? 'Save' : 'Add new Dish'}
          </button>
          {isEditing && (
            <button className="btn btn-outline-secondary" type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading && <p>Loading...</p>}

      <div className="d-flex flex-column gap-2">
        {dishes.map((dish: any) => (
          <div key={dish.id} className="border rounded p-2 d-flex align-items-center gap-2">
            <img
              src={dish.image}
              alt={dish.title}
              width={48}
              height={48}
              style={{ objectFit: 'cover', borderRadius: 6 }}
            />
            <div className="flex-grow-1">
              <div style={{ fontWeight: 700 }}>{dish.title}</div>
              <div>{dish.price} KGS</div>
            </div>

            <button className="btn btn-link" onClick={() => startEdit(dish)}>
              Edit
            </button>
            <button className="btn btn-link text-danger" onClick={() => dispatch(deleteDish(dish.id))}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDishesPage;
