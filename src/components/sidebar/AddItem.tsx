import { useState } from 'react';
import { GrEmoji } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { addItem, toggleSidebarType } from '@/reducer/actions';
import { useAppContext } from '@/reducer/Provider';
import dynamic from 'next/dynamic';
import { IEmojiPickerProps } from 'emoji-picker-react';
import { isValidName, sweetAlert } from '@/libs';
const Picker = dynamic<IEmojiPickerProps>(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => (
    <p className="px-6 py-3 bg-white shadow-lg text-gray-600 rounded-md">Loading ...</p>
  ),
});

const AddItem = () => {
  const { register, handleSubmit, watch, setValue, formState, setError } = useForm();
  const { state, dispatch } = useAppContext();
  const [emojiPickerHidden, setEmojiPickerHidden] = useState(true);

  const toggleEmojiPicker = () => setEmojiPickerHidden(!emojiPickerHidden);

  const onEmojiClick = (e, emojiObject) => {
    toggleEmojiPicker();
    setValue('emoji', emojiObject.emoji);
  };

  const categories = Object.keys(state.shopCategories);

  const onSubmit = async (data) => {
    dispatch(addItem(data));
    dispatch(toggleSidebarType('items'));
  };

  return (
    <div className="flex flex-col px-8 py-6 h-full bg-blue-50 overflow-x-visible overflow-y-auto">
      <h2 className="text-gray-800 text-xl font-bold">Add a new item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-auto">
        <div className="flex-auto">
          <label htmlFor="name" className="block text-gray-600 text-sm mt-3 mb-2">
            Name :
          </label>
          <input
            type="text"
            {...register('name', { required: false })}
            name="name"
            id="name"
            placeholder="Enter a name"
            className="w-full px-4 py-1 rounded-xl ring ring-gray-300 h-11 outline-none focus-within:ring-yellow-400"
          />
          <div className="py-1 text-xs text-red-600 font-bold">
            {watch('name') && watch('name').length < 2 && 'short name'}
          </div>

          <label htmlFor="note" className="block text-gray-600 text-sm  mt-3 mb-2">
            Note (optional):
          </label>
          <textarea
            {...register('note', { required: false })}
            name="note"
            id="note"
            rows={3}
            placeholder="Enter a note"
            className="w-full p-4 resize-none rounded-xl ring ring-gray-300 outline-none focus-within:ring-yellow-400"
          ></textarea>
          <div className="py-1 text-xs text-red-600 font-bold" />

          <label htmlFor="image" className="block text-gray-600 text-sm mt-3 mb-2">
            Image (optional):
          </label>
          <input
            {...register('img', { required: false })}
            type="text"
            name="img"
            id="img"
            placeholder="Enter a url"
            className="w-full px-4 py-1 rounded-xl ring ring-gray-300 h-11 outline-none focus-within:ring-yellow-400"
          />

          <label htmlFor="category" className="block text-gray-600 text-sm mt-3 mb-2">
            Category :
          </label>
          <select
            {...register('category', { required: true })}
            name="category"
            id="category"
            className="w-full h-11 rounded-xl px-4 py-1 text-gray-800 bg-white"
          >
            {categories.map((category) => (
              <option key={'option-' + category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="emoji" className="block text-gray-600 text-sm mt-3 mb-2">
            Emoji:
          </label>
          <div className="relative">
            <span className="absolute transform -translate-y-full">
              {!emojiPickerHidden && (
                <Picker
                  disableSearchBar={true}
                  groupVisibility={{
                    flags: false,
                    smileys_people: false,
                    travel_places: false,
                    activities: false,
                    symbols: false,
                    recently_used: false,
                  }}
                  onEmojiClick={onEmojiClick}
                />
              )}
            </span>
            <input
              type="text"
              name="emoji"
              maxLength={1}
              {...register('emoji', { required: true })}
              value={watch('emoji') ? `${watch('emoji')}` : '🥑'}
              id="emoji"
              className="w-full px-4 py-1 rounded-xl ring ring-gray-300 h-11 outline-none focus-within:ring-yellow-400"
            />
            <span
              onClick={toggleEmojiPicker}
              className="absolute transform hover:scale-110 hover:text-yellow-400 cursor-pointer right-5 top-1/2 -translate-y-1/2"
            >
              <GrEmoji size="1.4rem" />
            </span>
          </div>
        </div>

        <div className="flex justify-end items-center mt-4">
          <span
            onClick={() => dispatch(toggleSidebarType('items'))}
            className="text-gray-900 font-bold mr-4 cursor-pointer"
          >
            Cancel
          </span>
          <button
            type="submit"
            disabled={!isValidName(watch('name'))}
            className="py-2 px-6 bg-yellow-400 disabled:bg-gray-400 font-bold text-white rounded-xl"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
