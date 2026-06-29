import { useState } from "react";
import { useEffect } from "react";
import {
  getAutofillData,
  saveDailyEntry,
} from "../api/dailyEntry";
import CustomerSearch from "../components/CustomerSearch";
import ProductSearch from "../components/productSearch";
import PageLayout from "../components/PageLayout";
import SectionCard from "../components/SectionCard";

export default function DailyEntryPage() {
    const today = new Date().toISOString().split("T")[0]; //2026-06-02
    const currentHour = new Date().getHours();

    const defaultShift =
        currentHour < 12
            ? "Morning"
            : "Evening";
  
    const [formData, setFormData] = useState({
        customer_id: 0,
        customer_name: "",
        customer_number: "",
        date: today,
        shift: defaultShift,
        milk: {
        cow: 0,
        buffalo: 0,
        },
        extras: [
          {
              product_name: "",
              product_rate: 0,
              product_unit: "",
              quantity: 0,
          },
        ],
    });

    const [showConfirmation, setShowConfirmation] =
      useState(false);

    useEffect(() => {
      async function autofillMilk() {
          if (
              formData.customer_id === 0
          ) {
              return;
          }
  
          const data =
              await getAutofillData(
                  formData.customer_id,
                  formData.date,
                  formData.shift,
              );
  
          setFormData(
              (previous) => ({
                  ...previous,
  
                  milk: {
                      cow: data.cow,
                      buffalo:
                          data.buffalo,
                  },
              }),
          );
      }
  
      autofillMilk();
  }, [
      formData.customer_id,
      formData.date,
      formData.shift,
  ]);


    function addExtraRow() {
        setFormData({
        ...formData,
        extras: [
            ...formData.extras,
            {
              product_name: "",
              product_rate: 0,
              product_unit: "",
              quantity: 0,
          }
        ],
        });
    }

    function handleSave() {
      if (formData.customer_id === 0) {
          alert(
              "Please select a customer",
          );
          return;
      }
      setShowConfirmation(true);
  }

  async function confirmSave() {
    try {

        const payload = {

            ...formData,

            extras: formData.extras.map(
                (extra) => ({
                    product_name:
                        extra.product_name,

                    quantity:
                        extra.quantity,
                }),
            ),
        };

        await saveDailyEntry(
            payload,
        );

        setShowConfirmation(false);

        alert(
            "Entry saved successfully",
        );

        setFormData({

            customer_id: 0,

            customer_name: "",
            customer_number: "",

            date: today,
            shift: defaultShift,

            milk: {
                cow: 0,
                buffalo: 0,
            },

            extras: [
                {
                    product_name: "",
                    product_rate: 0,
                    product_unit: "",
                    quantity: 0,
                },
            ],
        });

    } catch (error) {

        console.error(error);

        setShowConfirmation(false);

        alert(
            "Failed to save entry",
        );
    }
}
    return (
      <PageLayout 
        title="Daily MIlk Entry"
        description="Milk Entry block."
       >
        <SectionCard>
            <div className="space-y-4">
            <div>
            <label className="block mb-1">
              Customer
            </label>
  
            <CustomerSearch
              value={
                  formData.customer_name
              }
              onChange={(value) =>
                  setFormData({
                      ...formData,
                      customer_name: value,
                  })
              }
              onSelect={(customer) =>
                  setFormData({
                      ...formData,
                      customer_id: customer.id,
                      customer_name:
                          customer.name,
                      customer_number:
                          customer.contact_number,
                  })
              }
              />
            
          </div>
  
          <div>
            <label className="block mb-1">
              Date
            </label>
  
            <input
              type="date"
              className="w-full border rounded p-2"
              defaultValue={formData.date}
              value={formData.date}
              onChange={(e) =>
              setFormData({
              ...formData,
              date: e.target.value ,
              })
              }
            />
          </div>
  
          <div>
            <label className="block mb-1">
              Shift
            </label>
  
            <select
              value={formData.shift}
              onChange={(e) =>
              setFormData({
              ...formData,
              shift: e.target.value,
              })
              }
              className="w-full border rounded p-2"
            >
              <option value="Morning" selected={formData.shift === "Morning"}>Morning</option>
              <option value="Evening" selected={formData.shift === "Evening"}>Evening</option>
            </select>
          </div>
  
          <div>
            <label className="block mb-1">
              Cow Milk (in ltrs)
            </label>
  
            <input

                type="number"
                min={0}
                step={0.5}
                value={formData.milk.cow}
                onChange={(e) =>
                setFormData({
                    ...formData,
                    milk: {
                    ...formData.milk,
                    cow: Number(e.target.value),
                    },
                })
                }
                className="w-full border rounded p-2"
            />
          </div>
  
          <div>
            <label className="block mb-1">
              Buffalo Milk (in ltrs)
            </label>
  
            <input
              type="number"
              min={0}
              step={0.5}
              value={formData.milk.buffalo}
              onChange={(e) =>
              setFormData({
                ...formData,
                milk: {
                ...formData.milk,
                buffalo: Number(e.target.value),
                },
              })
              }
              className="w-full border rounded p-2"
            />
            </div>
              <div className="border-t pt-4">

      <h2 className="text-xl font-semibold mb-3">
          Extra Items (in grams)
      </h2>

      {formData.extras.map((extra, index) => (

          <div
              key={index}
              className="grid grid-cols-2 gap-3 mb-3"
          >
            <ProductSearch
              value={extra.product_name}
              onChange={(value) => {
                  const updatedExtras =
                      [...formData.extras];
                  updatedExtras[index] = {
                      ...updatedExtras[index],
                      product_name: value,
                  };
                  setFormData({
                      ...formData,
                      extras: updatedExtras,
                  });
              }}
              onSelect={(product) => {
                  const updatedExtras =
                      [...formData.extras];
                  updatedExtras[index] = {
                      ...updatedExtras[index],
                      product_name:
                          product.name,
                      product_rate:
                          product.rate,
                      product_unit:
                          product.unit,
                  };
                  setFormData({
                      ...formData,
                      extras: updatedExtras,
                  });
              }}
            />
            {extra.product_rate > 0 && (
              <div
                  className="
                      text-sm
                      text-gray-500
                      mt-1
                  "
              >
                  Rate: ₹
                  {extra.product_rate}/
                  {extra.product_unit}
              </div>
              )}

          <input
              type="number"
              min={0}
              step={250}
              className="border rounded p-2"
              placeholder="Quantity"
              value={extra.quantity}
              onChange={(e) => {
                  const updatedExtras = [...formData.extras];
                  updatedExtras[index] = {
                  ...updatedExtras[index],
                  quantity: Number(e.target.value),
                  };
                  setFormData({
                  ...formData,
                  extras: updatedExtras,
                  });
              }}
          />
          </div>

      ))}
      <button
          type="button"
          onClick={addExtraRow}
          className="
          border
          rounded
          px-4
          py-2
          text-sm
          "
      >
          + Add Product
      </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="
                w-full
                rounded
                p-3
                font-semibold
                bg-green-700
                text-white
              "
            >
              Save Entry
            </button>
            {showConfirmation && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        flex
                        items-center
                        justify-center
                        z-50
                    "
                >
                    <div
                        className="
                            bg-white
                            rounded
                            p-6
                            w-full
                            max-w-md
                        "
                    >
                        <h2
                            className="
                                text-xl
                                font-bold
                                mb-4
                            "
                        >
                            Confirm Entry
                        </h2>

                        <div className="space-y-2">

                            <div>
                                Customer:
                                {" "}
                                {formData.customer_name}
                            </div>

                            <div>
                                Date:
                                {" "}
                                {formData.date}
                            </div>

                            <div>
                                Shift:
                                {" "}
                                {formData.shift}
                            </div>

                            <div>
                                Cow Milk:
                                {" "}
                                {formData.milk.cow}
                            </div>

                            <div>
                                Buffalo Milk:
                                {" "}
                                {formData.milk.buffalo}
                            </div>

                            {formData.extras.some(
                              (extra) =>
                                  extra.product_name.trim(),
                              ) && (
                              <>
                                  <div className="pt-2">
                                      Extras:
                                  </div>
                                  {formData.extras
                                      .filter(
                                          (extra) =>
                                              extra.product_name.trim(),
                                      )
                                      .map(
                                          (
                                              extra,
                                              index,
                                          ) => (
                                              <div
                                                  key={index}
                                              >
                                                  {
                                                      <strong>{extra.product_name}</strong>
                                                  }
                                                  {" : "}
                                                  {
                                                      extra.quantity
                                                  }
                                              </div>
                                          ),
                                      )}
                              </>
                              )}
                        </div>

                        <div
                            className="
                                flex
                                justify-end
                                gap-2
                                mt-6
                            "
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmation(
                                        false,
                                    )
                                }
                                className="
                                    border
                                    rounded
                                    px-4
                                    py-2
                                "
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={
                                    confirmSave
                                }
                                className="
                                    bg-green-700
                                    text-white
                                    rounded
                                    px-4
                                    py-2
                                "
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
              )}
            </div>
          
        </SectionCard>
      </PageLayout>
    );
  }